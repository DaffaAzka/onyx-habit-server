import { t, UnwrapSchema } from "elysia";

export const HabitLogModel = {
  createBody: t.Object({
    userId: t.String(),
    habitId: t.String(),
    date: t.Date(),
    status: t.Enum({
      DONE: "DONE",
      SKIPPED: "SKIPPED",
      MISSED: "MISSED",
    }),
    note: t.Optional(t.String()),
  }),
  updateBody: t.Object({
    userId: t.String(),
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
};

export type CreateBody = UnwrapSchema<typeof HabitLogModel.createBody>;
export type UpdateBody = UnwrapSchema<typeof HabitLogModel.updateBody>;

