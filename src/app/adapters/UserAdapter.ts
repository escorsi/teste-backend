import IUserAdapter, { IUserBody } from '../@types/IUserAdapter';
import IContainerDependencies from 'src/types/shared/containerDependencies';
import AppError from 'src/domain/errors/AppError';

type Dependencies = Pick<IContainerDependencies, 'logger' | 'userUseCase' | 'userEntity'>;

export default class UserAdapter implements IUserAdapter {
  private logger: Dependencies['logger'];
  private userUseCase: Dependencies['userUseCase'];
  private userEntity: Dependencies['userEntity'];

  constructor({ logger, userUseCase, userEntity }: Dependencies) {
    this.logger = logger;
    this.userUseCase = userUseCase;
    this.userEntity = userEntity;
  }

  async prepareUserData(userData: IUserBody): Promise<IUserBody> {
    const callName = `${this.constructor.name}.prepareUserData()`;

    try {
      this.logger.info(`${callName} - adapting user data`);

      const userEntity = await this.userEntity.validate(userData);
      this.logger.info(`${callName} - user entity created: ${userEntity.email}`);

      const createdUser = await this.userUseCase.insertUser(userEntity);

      this.logger.info(`${callName} - user created successfully`);
      return createdUser;
    } catch (error) {
      this.logger.error(`${callName} - error: ${(error as Error).message}`);
      throw new AppError(error);
    }
  }
}
