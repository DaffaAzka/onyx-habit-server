import { HabitCreateInput } from "./../../generated/prisma/models/Habit";
import Elysia, { t } from "elysia";
import { authGuard } from "../auth/plugin";
import {
  HabitPlainInputCreate,
  HabitPlainInputUpdate,
} from "../../generated/prismabox/Habit";
import { HabitLogService } from "./service";
import {
  HabitLogPlainInputCreate,
  HabitLogPlainInputUpdate,
} from "../../generated/prismabox/HabitLog";
import { HabitLogModel } from "./model";

export const habitLogRoute = new Elysia({
  prefix: "/habit_log",
})
  .use(authGuard)
  .get(
    "/",
    async ({ user }) => await HabitLogService.getAll({ userId: user.id }),
  )
  .get(
    "/:id",
    async ({ user, params: { id } }) =>
      await HabitLogService.getById({ userId: user.id, id: id }),
  )
  .post(
    "/",
    async ({ user, body }) => {
      return await HabitLogService.create({ userId: user.id, ...body });
    },
    {
      body: HabitLogModel.createBody,
    },
  )
  .patch(
    "/:id",
    async ({ user, body, params: { id } }) => {
      return await HabitLogService.update({ id: id, userId: user.id, ...body });
    },
    {
      body: HabitLogModel.updateBody,
    },
  )
  .delete(
    "/:id",
    async ({ user, params: { id }, body: { habitId } }) => {
      return await HabitLogService.delete({ id: id, userId: user.id, habitId });
    },
    {
      body: t.Object({
        habitId: t.String(),
      }),
    },
  );
