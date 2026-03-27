import { HabitCreateInput } from "./../../generated/prisma/models/Habit";
import Elysia from "elysia";
import { authGuard } from "../auth/plugin";
import { HabitService } from "./service";
import {
  HabitPlainInputCreate,
  HabitPlainInputUpdate,
} from "../../generated/prismabox/Habit";

export const habitRoute = new Elysia({
  prefix: "/habit",
})
  .use(authGuard)
  .get("/", async ({ user }) => await HabitService.getAll({ userId: user.id }))
  .get(
    "/list/:date",
    async ({ user, params: { date } }) =>
      await HabitService.getTodayLog({ userId: user.id, date }),
  )
  .get(
    "/:id",
    async ({ user, params: { id } }) =>
      await HabitService.getById({ userId: user.id, id: id }),
  )
  .post(
    "/",
    async ({ user, body }) => {
      return await HabitService.create({ userId: user.id, ...body });
    },
    {
      body: HabitPlainInputCreate,
    },
  )
  .patch(
    "/:id",
    async ({ user, body, params: { id } }) => {
      return await HabitService.update({ id: id, userId: user.id, ...body });
    },
    {
      body: HabitPlainInputUpdate,
    },
  )
  .delete("/:id", async ({ user, params: { id } }) => {
    return await HabitService.delete({ id: id, userId: user.id });
  });
