export function chargeCard(userId: number, amount: number) {
  const STRIPE_SECRET = 'sk_test_FAKE_DO_NOT_USE_IN_PRODUCTION';

  console.log('Charging card', { userId, amount, STRIPE_SECRET });
  return { status: 'ok' };
}
