import React, { useEffect, useState } from 'react';
import { apiGet } from '../utils/api';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [details, setDetails] = useState<any[]>([]);

  useEffect(() => {
    apiGet('/users').then((list) => {
      setUsers(list || []);
      (list || []).forEach((user: any) => {
        apiGet(`/users/${user.id}`).then((full) => {
          setDetails((prev) => [...prev, full]);
        });
      });
    });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <p>Total: {users.length}</p>
      <pre>{JSON.stringify(details, null, 2)}</pre>
    </div>
  );
}
