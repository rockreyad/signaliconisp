import { z } from 'zod';

const envSchema = z.object({
  // App
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().transform(Number).default('8000'),

  // Database
  DATABASE_URL: z.string().url(),

  // Bkash
  BKASH_USERNAME: z.string(),
  BKASH_PASSWORD: z.string(),
  BKASH_APP_KEY: z.string(),
  BKASH_APP_SECRET: z.string(),
  BKASH_GRANT_TOKEN_URL: z.string().url(),
  BKASH_CREATE_PAYMENT_URL: z.string().url(),
  BKASH_EXECUTE_PAYMENT_URL: z.string().url(),
  BKASH_CALLBACK_URL: z.string().url(),
  FRONTEND_SUCCESS_URL: z.string().url(),
  FRONTEND_FAIL_URL: z.string().url(),
});

const validateEnv = () => {
  try {
    const parsed = envSchema.parse(process.env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => err.path.join('.'));
      console.error('\n❌ Invalid or missing environment variables:');
      console.error(missingVars.map((v) => `   - ${v}`).join('\n'));
      process.exit(1);
    }
    throw error;
  }
};

export const env = validateEnv();
