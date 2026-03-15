import { status } from "elysia";
import { prisma } from "../../utils/db";

export abstract class HabitLogService {
  static async getAll({ userId }: { userId: string }) {
    try {
      const response = prisma.habitLog.groupBy({
        by: ["date"],
        where: {
          habit: {
            userId,
          },
        },
      });
      return status(200, {
        data: response,
        message: "",
      });
    } catch (error) {
      throw status(400, {
        error: error,
      });
    }
  }

  static async getById() {
    try {
      return status(200, {
        message: "",
      });
    } catch (error) {
      throw status(400, {
        error: error,
      });
    }
  }

  static async create() {
    try {
      return status(201, {
        message: "",
      });
    } catch (error) {
      throw status(400, {
        error: error,
      });
    }
  }

  static async update() {
    try {
      return status(200, {
        message: "",
      });
    } catch (error) {
      throw status(400, {
        error: error,
      });
    }
  }

  static async delete() {
    try {
      return status(200, {
        message: "",
      });
    } catch (error) {
      throw status(400, {
        error: error,
      });
    }
  }
}
