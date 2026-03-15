import { AuthModel } from "./model";
import Elysia, { t } from "elysia";
import { AuthService } from "./service";
import { authPlugin } from "./plugin";

export const authRoute = new Elysia({ prefix: "/auth" })
  .use(authPlugin)
  .post("/sign-up", async ({ body }) => await AuthService.signUp(body), {
    body: AuthModel.signUpBody,
  })
  .post("/sign-in", async ({ body }) => await AuthService.signIn(body), {
    body: AuthModel.signInBody,
  });
