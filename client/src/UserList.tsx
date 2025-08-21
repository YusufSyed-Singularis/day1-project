//import { useState, useEffect } from 'react';
import type { User } from './models.ts';
import { userDelete } from './UserFunctions.ts';

function UserList({ users, onUserDeleted }: { users: Record<number, User>, onUserDeleted: () => void }) {
  return (
    <ul>
      {Object.values(users).map(user => (
        <li key={user.id}>{user.name ? `${user.name}, ${user.email}` : user.email}
        <button onClick={async () => {
          try {
            await userDelete(user.id);
            onUserDeleted();
          } catch (error) {
            console.error("Error deleting user: ", error);
          }
        }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;