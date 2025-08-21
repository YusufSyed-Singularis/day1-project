import { useState, useEffect } from 'react'
import type { User } from './models.ts'
import UserList from './UserList.tsx'
import UserAdd from './UserAdd.tsx'
import { userQuery } from './UserFunctions.ts'
import './App.css'

function App() {
  const [users, setUsers] = useState<Record<number, User>>({});
  const [usersLoading, setUsersLoading] = useState<boolean>(false);

  async function updateUserList() {
    try {
      setUsersLoading(true);
      const data = await userQuery();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setUsersLoading(false);
    }
  }

  useEffect(() => {
    updateUserList();
  }, []);

  return (
    <>
      <div>
        {usersLoading ? (
          <p>Loading Users...</p>
        ) : (
          <UserList users={users} onUserDeleted={updateUserList} />
        )}
      </div>
      <div>
        <UserAdd onUserAdded={updateUserList} />
      </div>
    </>
  )
}

export default App
