import IContainerDependencies from 'src/types/shared/containerDependencies';
import IUserUseCase, { IUserBody } from 'src/app/@types/IUserUseCase';

type Dependencies = Pick<IContainerDependencies, 'userRepository'>;

export default class UserUseCase implements IUserUseCase {
  private userRepository: Dependencies['userRepository'];

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  async insertUser(userValidated: IUserBody): Promise<IUserBody> {
    return this.userRepository.insert(userValidated);
  }
}
