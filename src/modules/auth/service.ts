import { status } from "elysia";
import { auth } from "../../utils/auth";
import type { SignInBody, SignUpBody } from "./model";

export abstract class AuthService {
  static async signUp({ email, name, retry_password, password }: SignUpBody) {
    if (password !== retry_password) {
      throw status(400, { error: "Passwords do not match" });
    }

    await auth.api.signUpEmail({
      body: {
        name: name,
        email: email,
        password: password,
      },
    });

    return status(201, {
      data: {
        name: name,
        email: email,
      },
      message: "User created successfully!",
    });
  }

  static async signIn({ email, password }: SignInBody) {
    const response = await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
    });

    return status(200, {
      message: "User logged successfully!",
      data: {
        token: response.token,
        user: response.user,
      },
    });
  }

  static async check() {
    return status(200, {
      message: "Verification of the token was completed.",
    });
  }
}
