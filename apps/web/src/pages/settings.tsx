import { useState } from 'react';

// ISSUE #6: Inconsistent naming - camelCase vs snake_case mixed
interface UserSettings {
  theme: string;
  notification_enabled: boolean; // snake_case
  emailFrequency: string; // camelCase
  auto_save: boolean; // snake_case
  displayName: string; // camelCase
}

export default function Settings() {
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'dark',
    notification_enabled: true,
    emailFrequency: 'daily',
    auto_save: false,
    displayName: 'User',
  });

  // ISSUE #6: snake_case function name
  const handle_submit = () => {
    console.log('Settings saved:', settings);
  };

  return (
    <main className="container">
      <h1>Settings</h1>
      <form onSubmit={(e) => { e.preventDefault(); handle_submit(); }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Theme:
            <select
              value={settings.theme}
              onChange={(e) => setSettings({...settings, theme: e.target.value})}
              style={{ marginLeft: '0.5rem' }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={settings.notification_enabled}
              onChange={(e) => setSettings({...settings, notification_enabled: e.target.checked})}
            />
            Enable Notifications
          </label>
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Save</button>
      </form>
    </main>
  );
}
