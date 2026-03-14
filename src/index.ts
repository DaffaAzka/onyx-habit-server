import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { authPlugin } from "./modules/auth/plugin";
import { auth } from "./modules/auth";

const app = new Elysia()
  .use(openapi())
  .use(authPlugin)
  .use(auth)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
