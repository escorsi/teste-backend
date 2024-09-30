import AppError from 'src/domain/errors/AppError';
import ICompanyUserEntity, { ICompanyUserBody } from 'src/domain/@types/ICompanyUserEntity';

export default class CompanyUserEntity implements ICompanyUserEntity {
  public validateCompany(userData: ICompanyUserBody): void {
    if (!userData.cnpj) {
      throw new AppError('CNPJ is required for companies');
    }

    if (!userData.responsibleCpf) {
      throw new AppError('CPF of the responsible person is required for companies');
    }
  }
}
