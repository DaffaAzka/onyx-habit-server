import { status } from "elysia";
import { prisma } from "../../utils/db";
import { CreateBody, UpdateBody } from "./model";

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

  static async create({ userId, name }: CreateBody) {
    try {
      const response = await prisma.habit.create({
        data: {
          name: name,
          userId: userId,
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

  static async update({ id, userId, name }: UpdateBody) {
    try {
      const response = await prisma.habit.update({
        where: { id, userId },
        data: {
          name: name,
        },
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

  static async getTodayLog({ userId }: { userId: string }) {
    try {
      const today = new Date();
      const gte = new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate(),
          0,
          0,
          0,
        ),
      );
      const lt = new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate() + 1,
          0,
          0,
          0,
        ),
      );

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
      throw status(400, {
        error: error,
      });
    }
  }
}
