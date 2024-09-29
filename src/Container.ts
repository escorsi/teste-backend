import { createContainer, asClass } from 'awilix';
import { UserController } from 'src/interfaces/http/presentation/UserController';
import Logger from 'src/utils/Logger';

const container = createContainer();

container.register({
  logger: asClass(Logger).singleton(),
  userController: asClass(UserController).scoped(),
});

export default container;
