import AppError from 'src/domain/errors/AppError';
import IIndividualUserEntity, { IIndividualUserBody } from 'src/domain/@types/IIndividualUserEntity';

export default class IndividualUserEntity implements IIndividualUserEntity {
  public validateIndividual(userData: IIndividualUserBody): void {
    if (!userData.cpf) {
      throw new AppError('CPF is required for individuals');
    }
  }
}
