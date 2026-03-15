import { status } from "elysia";
import { prisma } from "../../utils/db";
import { CreateBody, UpdateBody } from "./model";

export abstract class HabitService {
  static async getAll({ userId }: { userId: string }) {
    try {
      const data = await prisma.habit.findMany({
        where: {
          userId,
        },
      });

      return status(200, {
        data: data,
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
      const data = await prisma.habit.findMany({
        where: {
          userId,
          id,
        },
      });

      return status(200, {
        data: data,
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
      const data = await prisma.habit.create({
        data: {
          name: name,
          userId: userId,
        },
      });

      return status(201, {
        data: data,
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
      const data = await prisma.habit.update({
        where: { id, userId },
        data: {
          name: name,
        },
      });

      return status(201, {
        data: data,
        message: "Habit updated successfully",
      });
    } catch (error) {
      throw status(400, {
        error: error,
      });
    }
  }
}
