import { createMiddleware, createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient();

const authenticationMiddleware = createMiddleware().define(async ({ next }) => {
  // const user = await assertAuthenticated();
  // TODO: remove this
  const user = { id: "1" };

  return next({ ctx: { user } });
});

export const authActionClient = actionClient.use(authenticationMiddleware);
