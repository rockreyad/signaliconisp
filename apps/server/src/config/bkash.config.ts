import { env } from '../utils/env';

export const bkashConfig = {
  username: env.BKASH_USERNAME,
  password: env.BKASH_PASSWORD,
  app_key: env.BKASH_APP_KEY,
  app_secret: env.BKASH_APP_SECRET,
  grant_token_url: env.BKASH_GRANT_TOKEN_URL,
  create_payment_url: env.BKASH_CREATE_PAYMENT_URL,
  execute_payment_url: env.BKASH_EXECUTE_PAYMENT_URL,
  backend_callback_url: env.BKASH_CALLBACK_URL,
  frontend_success_url: env.FRONTEND_SUCCESS_URL,
  frontend_fail_url: env.FRONTEND_FAIL_URL,
} as const;
