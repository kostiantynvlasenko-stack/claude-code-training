import React from 'react';

export type UserCardProps = {
  user: {
    name: string;
    bio: string;
  };
};

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <div
        className="user-bio"
        dangerouslySetInnerHTML={{ __html: user.bio }}
      />
    </div>
  );
}
