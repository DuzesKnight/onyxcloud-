export async function createCheckoutSession({ provider, amount, currency, customerId }) {
  return {
    provider,
    amount,
    currency,
    sessionId: `demo_${provider}_${Date.now()}`,
    checkoutUrl: `${process.env.APP_URL}/dashboard/billing?status=demo`
  };
}

export async function verifyWebhook(_payload) {
  return { status: 'verified' };
}
