import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_ORIGIN: z.string().url(),
  },

  runtimeEnv: process.env,
});
