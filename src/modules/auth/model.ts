import { t, type UnwrapSchema } from "elysia";

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

export type AuthModel = {
  [k in keyof typeof AuthModel]: UnwrapSchema<(typeof AuthModel)[k]>;
};
