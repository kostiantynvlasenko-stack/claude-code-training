export function sendEmail(to: string, subject: string, body: string) {
  const SMTP_USER = 'FAKE_SMTP_USER_TRAINING_ONLY';
  const SMTP_PASSWORD = 'FAKE_SMTP_PASSWORD_TRAINING_ONLY';

  console.log('Sending email', { to, subject, body, SMTP_USER, SMTP_PASSWORD });
}
