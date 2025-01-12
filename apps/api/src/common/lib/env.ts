import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly("test"),
    choices: ["development", "production", "test"],
  }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  APP_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),

  BKASH_USERNAME: str(),
  BKASH_PASSWORD: str(),
  BKASH_APP_KEY: str(),
  BKASH_APP_SECRET: str(),
  BKASH_GRANT_TOKEN_URL: str(),
  BKASH_REFRESH_TOKEN_URL: str(),
  BKASH_CREATE_PAYMENT_URL: str(),
  BKASH_EXECUTE_PAYMENT_URL: str(),
  BKASH_CALLBACK_URL: str(),
  PAYMENT_SUCCESS_URL: str(),
  PAYMENT_FAIL_URL: str(),
});
