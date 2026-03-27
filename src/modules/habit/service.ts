import { status } from "elysia";
import { prisma } from "../../utils/db";
import { CreateBody, UpdateBody } from "./model";
import { getUTCDayRange } from "../../utils/date";

export abstract class HabitService {
  static async getAll({ userId }: { userId: string }) {
    try {
      const response = await prisma.habit.findMany({
        where: {
          userId,
          deletedAt: null,
        },
      });

      return status(200, {
        data: response,
        message: "Get all habits successfully",
      });
    } catch (error) {
      throw status(400, {
        error: error,
      });
    }
  }

  static async getById({ id, userId }: { id: string; userId: string }) {
    try {
      const response = await prisma.habit.findFirst({
        where: {
          userId,
          id,
          deletedAt: null,
        },
      });

      if (!response) throw status(404, "Not Found");

      return status(200, {
        data: response,
        message: "Get specific habit successfully",
      });
    } catch (error) {
      throw status(400, {
        error: error,
      });
    }
  }

  static async create({ userId, ...data }: CreateBody) {
    try {
      const response = await prisma.habit.create({
        data: {
          ...data,
          userId,
        },
      });

      return status(201, {
        data: response,
        message: "Habit created successfully",
      });
    } catch (error) {
      throw status(400, {
        error: error,
      });
    }
  }

  static async update({ userId, id, ...data }: UpdateBody) {
    try {
      const response = await prisma.habit.update({
        where: { id, userId },
        data,
      });

      return status(201, {
        data: response,
        message: "Habit updated successfully",
      });
    } catch (error) {
      throw status(400, {
        error: error,
      });
    }
  }

  static async delete({ id, userId }: { id: string; userId: string }) {
    try {
      const response = await prisma.habit.update({
        where: { id, userId },
        data: {
          deletedAt: new Date(),
        },
      });
      return status(200, {
        data: response,
        message: "Habit deleted successfully",
      });
    } catch (error) {
      throw status(400, {
        error: error,
      });
    }
  }

  static async getTodayLog({ userId, date }: { userId: string; date: string }) {
    try {
      const { gte, lt } = getUTCDayRange(new Date(date ?? ""));
      console.log(new Date(date ?? ""));


      const response = await prisma.habit.findMany({
        where: { userId, deletedAt: null },
        include: {
          _count: {
            select: {
              logs: {
                where: {
                  date: {
                    gte,
                    lt,
                  },
                  status: "DONE",
                },
              },
            },
          },
        },
      });

      const filtering = response.map(({ _count, ...habit }) => ({
        ...habit,
        isLog: _count.logs > 0,
      }));

      return status(200, {
        data: filtering,
        message: "Get today habit successfully",
      });
    } catch (error) {
      console.error(error);
      throw status(400, {
        error: error,
      });
    }
  }
}
