import Elysia from "elysia";
import { auth } from "../../utils/auth";

export const authPlugin = new Elysia({ name: "better-auth" }).mount(
  auth.handler,
);

export const authGuard = new Elysia({ name: "auth-guard" })
  .use(authPlugin)
  .resolve(async ({ status, request: { headers } }) => {
    const session = await auth.api.getSession({ headers });

    if (!session) throw status(401);

    return {
      user: session.user,
      session: session.session,
    };
  })
  .as("scoped");
