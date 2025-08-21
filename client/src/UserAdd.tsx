import { useState } from 'react';
import { userCreate } from './UserFunctions'

export default function UserAdd({ onUserAdded }: { onUserAdded: () => void }) {
    const [entry, setEntry] = useState<{ email: string; name?: string }>({
        email: '',
        name: ''
    });
    const [message, setMessage] = useState<string>('');

    function flashMessage(msg: string) {
        setMessage(msg);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    return (
        <>
        <input
            type="email"
            value={entry.email}
            onChange={(e) => setEntry({ ...entry, email: e.target.value })}
        />
        <input
            type="text"
            value={entry.name}
            onChange={(e) => setEntry({ ...entry, name: e.target.value })}
        />
        <button onClick={async () => {
            if(!entry.email && !entry.name) {
                flashMessage("Please enter an email and name");
            }
            else if(!entry.email) {
                flashMessage("Please enter an email");
            }
            else if(!entry.name) {
                flashMessage("Please enter a name");
            }
            else{
                try {
                    await userCreate(entry.email, entry.name);
                    onUserAdded();
                } catch (error) {
                    flashMessage("Error adding user");
                    console.error("Error adding user:", error);
                }
            }
        }}>
        Add User</button>
        {message && <p>{message}</p>}
        </>
    );
}