import { useState, useEffect } from 'react';
import { UserCard } from '../components/UserCard';
import { Table } from '../components/Table';

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
}

// ISSUE #10: N+1 queries - fetches details for each user separately
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First, fetch list of users
    fetch('http://localhost:4000/users')
      .then(res => res.json())
      .then(async (userList) => {
        // ISSUE #10: Then fetch each user's details separately (N+1 problem)
        // Should fetch all data in single request instead
        const detailedUsers = await Promise.all(
          userList.map(async (user: { id: number }) => {
            const res = await fetch(`http://localhost:4000/users/${user.id}`);
            return res.json();
          })
        );
        setUsers(detailedUsers);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container">Loading...</div>;

  return (
    <main className="container">
      <h1>Users</h1>

      <h2>Card View</h2>
      <div className="user-list">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <h2>Table View</h2>
      <Table
        data={users}
        columns={['id', 'name', 'email']}
      />
    </main>
  );
}
