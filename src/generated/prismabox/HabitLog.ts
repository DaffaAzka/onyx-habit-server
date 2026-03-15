import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const HabitLogPlain = t.Object(
  {
    id: t.String(),
    habitId: t.String(),
    date: t.Date(),
    status: t.Union(
      [t.Literal("DONE"), t.Literal("SKIPPED"), t.Literal("MISSED")],
      { additionalProperties: false },
    ),
    note: __nullable__(t.String()),
    createdAt: t.Date(),
    deletedAt: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const HabitLogRelations = t.Object(
  {
    habit: t.Object(
      {
        id: t.String(),
        userId: t.String(),
        name: t.String(),
        createdAt: t.Date(),
        deletedAt: __nullable__(t.Date()),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const HabitLogPlainInputCreate = t.Object(
  {
    date: t.Date(),
    status: t.Union(
      [t.Literal("DONE"), t.Literal("SKIPPED"), t.Literal("MISSED")],
      { additionalProperties: false },
    ),
    note: t.Optional(__nullable__(t.String())),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const HabitLogPlainInputUpdate = t.Object(
  {
    date: t.Optional(t.Date()),
    status: t.Optional(
      t.Union([t.Literal("DONE"), t.Literal("SKIPPED"), t.Literal("MISSED")], {
        additionalProperties: false,
      }),
    ),
    note: t.Optional(__nullable__(t.String())),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const HabitLogRelationsInputCreate = t.Object(
  {
    habit: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const HabitLogRelationsInputUpdate = t.Partial(
  t.Object(
    {
      habit: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const HabitLogWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          habitId: t.String(),
          date: t.Date(),
          status: t.Union(
            [t.Literal("DONE"), t.Literal("SKIPPED"), t.Literal("MISSED")],
            { additionalProperties: false },
          ),
          note: t.String(),
          createdAt: t.Date(),
          deletedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "HabitLog" },
  ),
);

export const HabitLogWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              habitId_date: t.Object(
                { habitId: t.String(), date: t.Date() },
                { additionalProperties: false },
              ),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({
              habitId_date: t.Object(
                { habitId: t.String(), date: t.Date() },
                { additionalProperties: false },
              ),
            }),
          ],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              habitId: t.String(),
              date: t.Date(),
              status: t.Union(
                [t.Literal("DONE"), t.Literal("SKIPPED"), t.Literal("MISSED")],
                { additionalProperties: false },
              ),
              note: t.String(),
              createdAt: t.Date(),
              deletedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "HabitLog" },
);

export const HabitLogSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      habitId: t.Boolean(),
      date: t.Boolean(),
      status: t.Boolean(),
      note: t.Boolean(),
      createdAt: t.Boolean(),
      deletedAt: t.Boolean(),
      habit: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const HabitLogInclude = t.Partial(
  t.Object(
    { status: t.Boolean(), habit: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const HabitLogOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      habitId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      date: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      note: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      deletedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const HabitLog = t.Composite([HabitLogPlain, HabitLogRelations], {
  additionalProperties: false,
});

export const HabitLogInputCreate = t.Composite(
  [HabitLogPlainInputCreate, HabitLogRelationsInputCreate],
  { additionalProperties: false },
);

export const HabitLogInputUpdate = t.Composite(
  [HabitLogPlainInputUpdate, HabitLogRelationsInputUpdate],
  { additionalProperties: false },
);
