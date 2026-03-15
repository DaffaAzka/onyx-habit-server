import { t, type UnwrapSchema } from "elysia";
import { HabitLogPlainInputUpdate } from "../../generated/prismabox/HabitLog";

export const AuthModel = {
  signUpBody: t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String(),
    retry_password: t.String(),
  }),
  signInBody: t.Object({
    email: t.String(),
    password: t.String(),
  }),
} as const;

export type SignUpBody = UnwrapSchema<typeof AuthModel.signUpBody>;
export type SignInBody = UnwrapSchema<typeof AuthModel.signInBody>;
