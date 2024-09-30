import { AwilixContainer } from 'awilix';
import { Router } from 'express';
import IUserController from 'src/interfaces/http/@types/IUserController';
import IUserAdapter from 'src/app/@types/IUserAdapter';
import IUserUseCase from 'src/app/@types/IUserUseCase';
import IUserRepository from 'src/infra/@types/IUserRepository';
import IUserEntity from 'src/domain/@types/IUserEntity';
import IAddressEntity from 'src/domain/@types/IAddressEntity';
import ICompanyUserEntity from 'src/domain/@types/ICompanyUserEntity';
import IIndividualUserEntity from 'src/domain/@types/IIndividualUserEntity';
import Logger from 'src/utils/Logger';

export default interface IContainerDependencies {
  userController: IUserController;
  userAdapter: IUserAdapter;
  userUseCase: IUserUseCase;
  userRepository: IUserRepository;
  userEntity: IUserEntity;
  addressEntity: IAddressEntity;
  companyUserEntity: ICompanyUserEntity;
  individualUserEntity: IIndividualUserEntity;
  container: AwilixContainer;
  router: Router;
  logger: Logger;
  scopeEnum: object;
}
