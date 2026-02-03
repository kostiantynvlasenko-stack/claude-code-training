import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();

	// ISSUE #5: This line uses tabs instead of spaces
  const greeting = user ? `Welcome, ${user.name}!` : 'Please log in';
    // ISSUE #5: Extra inconsistent indentation

  return (
    <main className="container">
      <h1>Dashboard</h1>
			<p>{greeting}</p>
      <div className="stats">
        <div>Total Users: 42</div>
		<div>Active Sessions: 12</div>
        <div>Files Uploaded: 156</div>
      </div>
    </main>
  );
}
