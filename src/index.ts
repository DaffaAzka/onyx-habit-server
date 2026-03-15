import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { authGuard, authPlugin } from "./modules/auth/plugin";
import { authRoute } from "./modules/auth";
import { habitRoute } from "./modules/habit";
import { habitLogRoute } from "./modules/habit_log";

const app = new Elysia()
  .use(openapi())
  .use(authPlugin)
  .use(authRoute)
  .use(habitRoute)
  .use(habitLogRoute)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
