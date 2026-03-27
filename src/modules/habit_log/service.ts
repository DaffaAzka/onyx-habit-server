import { status as responseStatus } from "elysia";
import { prisma } from "../../utils/db";
import { CreateBody, CreateOrUpdateBody, UpdateBody } from "./model";
import { getUTCDayRange } from "../../utils/date";

export abstract class HabitLogService {
  static async getAll({ userId }: { userId: string }) {
    try {
      const response = await prisma.habitLog.findMany({
        where: {
          habit: {
            userId,
          },
        },

        select: {
          id: true,
          date: true,
          status: true,
          note: true,
          habit: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return responseStatus(200, {
        data: response,
        message: "",
      });
    } catch (error) {
      throw responseStatus(400, {
        error: error,
      });
    }
  }

  static async getById({ id, userId }: { id: string; userId: string }) {
    try {
      const response = await prisma.habitLog.findFirst({
        where: {
          id,
          habit: {
            userId,
          },
        },

        select: {
          id: true,
          date: true,
          status: true,
          note: true,
          habit: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return responseStatus(200, {
        data: response,
        message: "Get specific habit log successfully",
      });
    } catch (error) {
      throw responseStatus(400, {
        error: error,
      });
    }
  }

  static async create({
    habitId,
    status,
    note,
    date,
    userId,
  }: CreateBody & { userId: string }) {
    try {
      const response = await prisma.habitLog.create({
        data: {
          habitId,
          status,
          note,
          date: new Date(date),
        },
      });

      return responseStatus(201, {
        data: response,
        message: "Habit log created successfully",
      });
    } catch (error) {
      throw responseStatus(400, { error });
    }
  }

  static async update({
    userId,
    id,
    habitId,
    ...data
  }: UpdateBody & { id: string; userId: string }) {
    try {
      const response = await prisma.habitLog.update({
        where: {
          id,
          habit: {
            id: habitId,
            userId: userId,
          },
        },
        data: {
          habitId,
          ...data,
        },
      });
      return responseStatus(200, {
        data: response,
        message: "Habit log updated successfully",
      });
    } catch (error) {
      throw responseStatus(400, {
        error: error,
      });
    }
  }

  static async createOrUpdate({
    habitId,
    userId,
    ...data
  }: CreateOrUpdateBody & {
    userId: string;
  }) {
    try {
      const { gte, lt } = getUTCDayRange(new Date(data.date ?? ""));

      const habitLog = await prisma.habitLog.findFirst({
        where: {
          date: { gte, lt },
          habitId,
          habit: { userId },
        },
      });

      const { date, ...rest } = data;

      return habitLog ?
          await this.update({
            id: habitLog.id,
            habitId: habitId,
            userId: userId,
            ...rest,
          })
        : await this.create({
            habitId: habitId,
            userId: userId,
            date: date ?? gte.toISOString().split("T")[0],
            ...rest,
          });
    } catch (error) {
      throw responseStatus(400, {
        error: error,
      });
    }
  }

  static async delete({
    id,
    habitId,
    userId,
  }: {
    id: string;
    userId: string;
    habitId: string;
  }) {
    try {
      const response = await prisma.habitLog.update({
        where: {
          id,
          habit: {
            id: habitId,
            userId: userId,
          },
        },
        data: {
          status: "MISSED",
        },
      });
      return responseStatus(200, {
        data: response,
        message: "Habit log deleted successfully",
      });
    } catch (error) {
      throw responseStatus(400, {
        error: error,
      });
    }
  }
}
