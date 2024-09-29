import { Request, Response } from 'express';
import Logger from 'src/utils/Logger';
import AppError from 'src/domain/errors/AppError';

export default class UserController {
  private logger: Logger;

  constructor({ logger }: { logger: Logger }) {
    this.logger = logger;
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const callName = `${this.constructor.name}.${this.createUser.name}()`;
    try {
      this.logger.info(`${callName} - body entry ${JSON.stringify(req.body)}`);

      const userData = req.body;

      res.status(201).json({
        message: 'User created successfully',
        user: userData,
      });

      this.logger.info(`${callName} - user created: ${userData.email}`);
    } catch (error: unknown) {
      this.logger.error(`${callName} - error : ${(error as Error).message || 'Unknown error'}`);
      throw new AppError(error);
    }
  }
}
