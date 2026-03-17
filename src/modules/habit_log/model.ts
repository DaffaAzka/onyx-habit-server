import { t, UnwrapSchema } from "elysia";
import { HabitLogPlainInputUpdate } from "../../generated/prismabox/HabitLog";

export const HabitLogModel = {
  createBody: t.Object({
    habitId: t.String(),
    date: t.Optional(t.Date()),
    status: t.Enum({
      DONE: "DONE",
      SKIPPED: "SKIPPED",
      MISSED: "MISSED",
    }),
    note: t.Optional(t.String()),
  }),
  updateBody: t.Object({
    habitId: t.String(),
    date: t.Optional(t.Date()),
    status: t.Optional(
      t.Enum({
        DONE: "DONE",
        SKIPPED: "SKIPPED",
        MISSED: "MISSED",
      }),
    ),
    note: t.Optional(t.String()),
  }),
  createOrUpdateBody: t.Object({
    habitId: t.String(),
    date: t.Optional(t.Date()),
    status: t.Enum({
        DONE: "DONE",
        SKIPPED: "SKIPPED",
        MISSED: "MISSED",
      }),
    note: t.Optional(t.String()),
  }),
};

export type CreateBody = UnwrapSchema<typeof HabitLogModel.createBody>;
export type UpdateBody = UnwrapSchema<typeof HabitLogModel.updateBody>;
export type CreateOrUpdateBody = UnwrapSchema<typeof HabitLogModel.createOrUpdateBody>;
