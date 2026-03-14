import { AuthModel } from "./model";
import Elysia from "elysia";
import { AuthService } from "./service";

export const auth = new Elysia({ prefix: "/auth" })
  .post(
    "/sign-up",
    async ({ body }) => {
      const response = await AuthService.signUp(body);
      return response;
    },
    {
      body: AuthModel.signUpBody,
    },
  )
  .post(
    "/sign-in",
    async ({ body }) => {
      const response = await AuthService.signIn(body);
      return response;
    },
    {
      body: AuthModel.signInBody,
    },
  );
