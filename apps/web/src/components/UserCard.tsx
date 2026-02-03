interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    bio: string;
  };
}

// ISSUE #1 (CRITICAL): XSS vulnerability via dangerouslySetInnerHTML
// User-controlled HTML is rendered without sanitization
export function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {/* VULNERABLE: User bio can contain malicious scripts */}
      <div
        className="user-bio"
        dangerouslySetInnerHTML={{ __html: user.bio }}
      />
    </div>
  );
}

// Safe version:
// export function UserCardSafe({ user }: UserCardProps) {
//   return (
//     <div className="user-card">
//       <h3>{user.name}</h3>
//       <p>{user.email}</p>
//       <div className="user-bio">{user.bio}</div>
//     </div>
//   );
// }
