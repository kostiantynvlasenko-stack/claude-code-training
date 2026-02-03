import React, { useState } from 'react';

export default function SettingsPage() {
  const [user_settings, setUserSettings] = useState({
    email_notifications: true
  });

  function toggleEmail() {
    setUserSettings({
      ...user_settings,
      email_notifications: !user_settings.email_notifications
    });
  }

  return (
    <div>
      <h1>Settings</h1>
      <label>
        <input
          type="checkbox"
          checked={user_settings.email_notifications}
          onChange={toggleEmail}
        />
        Email notifications
      </label>
    </div>
  );
}
