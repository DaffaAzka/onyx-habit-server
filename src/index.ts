import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { authGuard, authPlugin } from "./modules/auth/plugin";
import { authRoute } from "./modules/auth";

const app = new Elysia()
  .use(openapi())
  .use(authPlugin)
  .use(authRoute)
  .get("/", () => "Hello Elysia")
  .use(authGuard)
  .get("/profile", ({ user }) => `Welcome back ${user.name}`)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
