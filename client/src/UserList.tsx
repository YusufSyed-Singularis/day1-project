//import { useState, useEffect } from 'react';
import type { User } from './models.ts';
import { userDelete } from './UserFunctions.ts';

function UserList({ users }: { users: Record<number, User> }) {
  return (
    <ul>
      {Object.values(users).map(user => (
        <li key={user.id}>{user.name ? `${user.name}, ${user.email}` : user.email}
        <button onClick={() => userDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;