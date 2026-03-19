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

      const grouped = response.reduce(
        (acc, log) => {
          const date = log.date.toISOString().split("T")[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(log);
          return acc;
        },
        {} as Record<string, typeof response>,
      );

      return responseStatus(200, {
        data: grouped,
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
    ...data
  }: CreateBody & {
    userId: string;
  }) {
    try {
      const response = await prisma.habitLog.create({
        data: {
          date: new Date(),
          ...data,
        },
      });
      return responseStatus(201, {
        data: response,
        message: "Habit log created successfully",
      });
    } catch (error) {
      throw responseStatus(400, {
        error: error,
      });
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
      const { gte } = getUTCDayRange();
      const habitLog = await prisma.habitLog.findFirst({
        where: {
          date: gte,
          habitId,
          habit: { userId },
        },
      });

      return habitLog ?
          await this.update({
            id: habitLog.id,
            habitId: habitId,
            userId: userId,
            ...data,
          })
        : await this.create({
            habitId: habitId,
            userId: userId,
            ...data,
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
