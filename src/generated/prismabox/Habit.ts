import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const HabitPlain = t.Object(
  {
    id: t.String(),
    userId: t.String(),
    name: t.String(),
    icon: t.String(),
    color: t.String(),
    createdAt: t.Date(),
    deletedAt: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const HabitRelations = t.Object(
  {
    user: t.Object(
      {
        id: t.String(),
        name: t.String(),
        email: t.String(),
        emailVerified: t.Boolean(),
        image: __nullable__(t.String()),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    logs: t.Array(
      t.Object(
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
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const HabitPlainInputCreate = t.Object(
  {
    name: t.String(),
    icon: t.Optional(t.String()),
    color: t.Optional(t.String()),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const HabitPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    icon: t.Optional(t.String()),
    color: t.Optional(t.String()),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const HabitRelationsInputCreate = t.Object(
  {
    user: t.Object(
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
    logs: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const HabitRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user: t.Object(
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
      logs: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const HabitWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          userId: t.String(),
          name: t.String(),
          icon: t.String(),
          color: t.String(),
          createdAt: t.Date(),
          deletedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Habit" },
  ),
);

export const HabitWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
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
              userId: t.String(),
              name: t.String(),
              icon: t.String(),
              color: t.String(),
              createdAt: t.Date(),
              deletedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Habit" },
);

export const HabitSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      userId: t.Boolean(),
      name: t.Boolean(),
      icon: t.Boolean(),
      color: t.Boolean(),
      createdAt: t.Boolean(),
      deletedAt: t.Boolean(),
      user: t.Boolean(),
      logs: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const HabitInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), logs: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const HabitOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      icon: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      color: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Habit = t.Composite([HabitPlain, HabitRelations], {
  additionalProperties: false,
});

export const HabitInputCreate = t.Composite(
  [HabitPlainInputCreate, HabitRelationsInputCreate],
  { additionalProperties: false },
);

export const HabitInputUpdate = t.Composite(
  [HabitPlainInputUpdate, HabitRelationsInputUpdate],
  { additionalProperties: false },
);
