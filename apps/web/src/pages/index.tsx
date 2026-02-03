import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <h1>Code Quality Training</h1>
      <p>This app contains intentional security issues for training purposes.</p>

      <nav style={{ marginTop: '2rem' }}>
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/users">Users</Link></li>
          <li><Link href="/settings">Settings</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
      </nav>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <strong>Warning:</strong> This is a training application with intentional vulnerabilities.
        Do not use in production!
      </div>
    </main>
  );
}
