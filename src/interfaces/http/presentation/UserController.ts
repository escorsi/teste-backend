import IContainerDependencies from 'src/types/shared/containerDependencies';
import { Request, Response } from 'express';
import AppError from 'src/domain/errors/AppError';
import IEntryData from 'src/types/modules/data';
import IUserController from '../@types/IUserController';

type Dependencies = Pick<IContainerDependencies, 'logger' | 'userAdapter'>;
export default class UserController implements IUserController {
  private logger: Dependencies['logger'];
  private userAdapter: Dependencies['userAdapter'];

  constructor({ logger, userAdapter }: Dependencies) {
    this.logger = logger;
    this.userAdapter = userAdapter;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const callName = `${this.constructor.name}.createUser()`;
    try {
      this.logger.info(`${callName} - Initiating user creation process`);

      const userData: IEntryData = req.body;
      await this.userAdapter.prepareUserData(userData);

      this.logger.info(`${callName} - User successfully created`);

      res.status(201).json({
        message: 'User created successfully',
      });
    } catch (error: unknown) {
      const errorMessage = (error as AppError).error?.message || 'Unknown error';
      this.logger.error(`${callName} - error : ${errorMessage}`);
  
      throw new AppError(error);
    }
  }
}
