import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { UserCard } from '../components/UserCard';
import { List } from '../components/List';
import { Modal } from '../components/Modal';

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const unused = 123;

  return (
    <div>
      <h1>Code Quality Training</h1>
      <LoginForm />

      <UserCard
        user={{
          name: 'Jane Doe',
          bio: '<strong>Trainer</strong> and <em>mentor</em>'
        }}
      />

      <List items={['one', 'two', 'three']} />

      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        Modal content
      </Modal>
    </div>
  );
}
