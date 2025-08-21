import { useState } from 'react';
import type { User } from './models.ts';
import { userDelete, userUpdate } from './UserFunctions.ts';

function UserList({ users, onUserDeleted }: { users: Record<number, User>, onUserDeleted: () => void }) {
  const [editing, setEditing] = useState<number>(-1);
  const [editName, setEditName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(users).map(user => (
          <tr key={user.id}>
            <td>{editing == user.id ? (
              <input type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
            ) : (
              user.email
            )}</td>
            <td>{editing == user.id ? (
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
            ) : (
              user.name
            )}</td>
            <td>
              {editing == user.id ? (
                <button onClick={async () => {
                  try {
                    await userUpdate(user.id, editEmail, editName);
                    onUserDeleted();
                  } catch(error) {
                    console.error("Error updating user: ", error);
                  }
                  setEditing(-1);
                }}>Update</button>
              ) : (
                <button onClick={() => {
                  setEditing(user.id)
                  setEditEmail(user.email || "");
                  setEditName(user.name || "");
                }}>Edit</button>
              )}
              <button onClick={async () => {
                try {
                  await userDelete(user.id);
                  onUserDeleted();
                } catch (error) {
                  console.error("Error deleting user: ", error);
                }
              }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;