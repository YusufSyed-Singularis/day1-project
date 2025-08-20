import { useState, useEffect } from 'react'
import type { User } from './models.ts'
import UserList from './UserList.tsx'
import { userQuery, userCreate } from './UserFunctions.ts'
import './App.css'

function App() {
  const [users, setUsers] = useState<Record<number, User>>({});
  
  useEffect(() => {
    userQuery().then(data => {
      setUsers(data);
    });
  }, []);

  return (
    <>
      <div>
        <p>
          <UserList users={users} />
        </p>
      </div>
    </>
  )
}

export default App
