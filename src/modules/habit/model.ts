import { t, UnwrapSchema } from "elysia";

export const HabitModel = {
  createBody: t.Object({
    userId: t.String(),
    name: t.String(),
    color: t.Optional(t.String()),
    icon: t.Optional(t.String()),
  }),
  updateBody: t.Object({
    id: t.String(),
    userId: t.String(),
    name: t.Optional(t.String()),
    color: t.Optional(t.String()),
    icon: t.Optional(t.String()),
  }),
};

export type CreateBody = UnwrapSchema<typeof HabitModel.createBody>;
export type UpdateBody = UnwrapSchema<typeof HabitModel.updateBody>;
