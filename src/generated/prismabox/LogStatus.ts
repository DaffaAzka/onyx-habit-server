import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const LogStatus = t.Union(
  [t.Literal("DONE"), t.Literal("SKIPPED"), t.Literal("MISSED")],
  { additionalProperties: false },
);
