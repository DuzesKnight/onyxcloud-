export const env = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'dev',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  billingUrl: process.env.BILLING_URL || 'http://localhost:4010',
  provisioningUrl: process.env.PROVISIONING_URL || 'http://localhost:4020'
};
