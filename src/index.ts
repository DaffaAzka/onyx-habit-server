import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { authGuard, authPlugin } from "./modules/auth/plugin";
import { authRoute } from "./modules/auth";
import { habitRoute } from "./modules/habit";

const app = new Elysia()
  .use(openapi())
  .use(authPlugin)
  .use(authRoute)
  .use(habitRoute)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
