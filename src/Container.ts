import { createContainer, asClass } from 'awilix';
import UserController from 'src/interfaces/http/presentation/UserController';
import Logger from 'src/utils/Logger';
import UserAdapter from 'src/app/adapters/UserAdapter';
import UserUseCase from 'src/app/usecases/UserUseCase';
import UserRepository from './infra/repositories/UserRepository';
import UserEntity from './domain/entitites/UserEntity';
import AddressEntity from './domain/entitites/AddressEntity';
import CompanyUserEntity from './domain/entitites/CompanyUserEntity';
import IndividualUserEntity from './domain/entitites/IndividualUserEntity';

const container = createContainer();

container.register({
  logger: asClass(Logger).singleton(),
  userController: asClass(UserController).scoped(),
  userAdapter: asClass(UserAdapter).scoped(),
  userUseCase: asClass(UserUseCase).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  userEntity: asClass(UserEntity).scoped(),
  addressEntity: asClass(AddressEntity).scoped(),
  companyUserEntity: asClass(CompanyUserEntity).scoped(),
  individualUserEntity: asClass(IndividualUserEntity).scoped(),
});

export default container;
