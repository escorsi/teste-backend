import IContainerDependencies from 'src/types/shared/containerDependencies';
import AppError from 'src/domain/errors/AppError';
import IUserEntity, { IEntryData, IUserBodyValidated } from 'src/domain/@types/IUserEntity';

type Dependencies = Pick<IContainerDependencies, 'addressEntity' | 'companyUserEntity' | 'individualUserEntity'>;

export default class UserEntity implements IUserEntity {
  private addressEntity: Dependencies['addressEntity'];
  private companyUserEntity: Dependencies['companyUserEntity'];
  private individualUserEntity: Dependencies['individualUserEntity'];

  constructor({ addressEntity, companyUserEntity, individualUserEntity }: Dependencies) {
    this.addressEntity = addressEntity;
    this.companyUserEntity = companyUserEntity;
    this.individualUserEntity = individualUserEntity;
  }

  async validate(userData: IEntryData): Promise<IUserBodyValidated> {
    if (userData.email !== userData.confirmEmail) {
      throw new AppError('Emails do not match');
    }

    if (!userData.acceptedTerms) {
      throw new AppError('User must accept the terms');
    }

    if (userData.personType === 'individual') {
      this.individualUserEntity.validateIndividual(userData);
    } else if (userData.personType === 'company') {
      this.companyUserEntity.validateCompany(userData);
    }

    this.addressEntity.validateAddress(userData.address);

    const validatedUser: IUserBodyValidated = {
        personType: userData.personType,
        cpf: userData.cpf || null,
        cnpj: userData.cnpj || null,
        responsibleCpf: userData.responsibleCpf || null,
        name: userData.name,
        mobile: userData.mobile,
        phone: userData.phone || null,
        email: userData.email,
        confirmEmail: userData.confirmEmail,
        address: userData.address,
        acceptedTerms: userData.acceptedTerms,
      };

    return validatedUser;
  }
}
