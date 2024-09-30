import CompanyUserEntity from 'src/domain/entities/CompanyUserEntity';
import AppError from 'src/domain/errors/AppError';
import { IEntryData } from 'src/domain/@types/IUserEntity';

describe('CompanyUserEntity', () => {
  let companyUserEntity: CompanyUserEntity;

  beforeEach(() => {
    companyUserEntity = new CompanyUserEntity();
  });

  it('should throw AppError if CNPJ is missing', () => {
    const invalidCompanyData: IEntryData = {
      personType: 'company',
      cnpj: '',
      responsibleCpf: '12345678901',
      name: 'Company Name',
      mobile: '1234567890',
      email: 'test@example.com',
      confirmEmail: 'test@example.com',
      address: {
        postalCode: '12345678',
        street: 'Street Name',
        number: '123',
        city: 'City Name',
        district: 'District Name',
        state: 'ST',
      },
      acceptedTerms: true,
    };

    try {
      companyUserEntity.validateCompany(invalidCompanyData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('should throw AppError if responsible CPF is missing', () => {
    const invalidCompanyData: IEntryData = {
      personType: 'company',
      cnpj: '12345678000199',
      responsibleCpf: '',
      name: 'Company Name',
      mobile: '1234567890',
      email: 'test@example.com',
      confirmEmail: 'test@example.com',
      address: {
        postalCode: '12345678',
        street: 'Street Name',
        number: '123',
        city: 'City Name',
        district: 'District Name',
        state: 'ST',
      },
      acceptedTerms: true,
    };

    try {
      companyUserEntity.validateCompany(invalidCompanyData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('should validate company data when both CNPJ and responsible CPF are provided', () => {
    const validCompanyData: IEntryData = {
      personType: 'company',
      cnpj: '12345678000199',
      responsibleCpf: '12345678901',
      name: 'Company Name',
      mobile: '1234567890',
      email: 'test@example.com',
      confirmEmail: 'test@example.com',
      address: {
        postalCode: '12345678',
        street: 'Street Name',
        number: '123',
        city: 'City Name',
        district: 'District Name',
        state: 'ST',
      },
      acceptedTerms: true,
    };

    expect(() => companyUserEntity.validateCompany(validCompanyData)).not.toThrow();
  });
});
