import { status } from "elysia";
import { auth } from "../../utils/auth";
import type { AuthModel } from "./model";

export abstract class AuthService {
  static async signUp({
    email,
    name,
    retry_password,
    password,
  }: AuthModel["signUpBody"]) {
    if (password !== retry_password) return status(400);
    await auth.api.signUpEmail({
      body: {
        name: name,
        email: email,
        password: password,
      },
    });

    return {
      status: 201,
      email: email,
      message: "User created successfully!",
    };
  }

  static async signIn({ email, password }: AuthModel["signInBody"]) {
    const response = await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
    });

    return {
      status: 200,
      token: response.token,
      user: response.user,
      message: "User logged successfully!",
    };
  }
}
