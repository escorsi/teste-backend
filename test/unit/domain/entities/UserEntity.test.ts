import UserEntity from 'src/domain/entities/UserEntity';
import AppError from 'src/domain/errors/AppError';
import { IEntryData, IUserBodyValidated } from 'src/domain/@types/IUserEntity';

const mockAddressEntity = {
  validateAddress: jest.fn(),
};
const mockCompanyUserEntity = {
  validateCompany: jest.fn(),
};
const mockIndividualUserEntity = {
  validateIndividual: jest.fn(),
};

describe('UserEntity', () => {
  let userEntity: UserEntity;

  beforeEach(() => {
    userEntity = new UserEntity({
      addressEntity: mockAddressEntity as any,
      companyUserEntity: mockCompanyUserEntity as any,
      individualUserEntity: mockIndividualUserEntity as any,
    });
  });

  it('should validate individual user data', async () => {
    const userData: IEntryData = {
      personType: 'individual',
      cpf: '12345678901',
      email: 'test@example.com',
      confirmEmail: 'test@example.com',
      name: 'John Doe',
      mobile: '1234567890',
      phone: '1234567890',
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

    const validatedUser: IUserBodyValidated = {
      ...userData,
      cnpj: null,
      responsibleCpf: null,
    };

    mockIndividualUserEntity.validateIndividual.mockReturnValueOnce(undefined);
    mockAddressEntity.validateAddress.mockReturnValueOnce(undefined);

    const result = await userEntity.validate(userData);

    expect(mockIndividualUserEntity.validateIndividual).toHaveBeenCalledWith(userData);
    expect(mockAddressEntity.validateAddress).toHaveBeenCalledWith(userData.address);
    expect(result).toEqual(validatedUser);
  });

  it('should validate company user data', async () => {
    const userData: IEntryData = {
      personType: 'company',
      cnpj: '12345678000199',
      responsibleCpf: '12345678901',
      email: 'company@example.com',
      confirmEmail: 'company@example.com',
      name: 'Company Name',
      mobile: '1234567890',
      phone: '1234567890',
      address: {
        postalCode: '12345678',
        street: 'Company Street',
        number: '100',
        city: 'City Name',
        district: 'District Name',
        state: 'ST',
      },
      acceptedTerms: true,
    };

    const validatedUser: IUserBodyValidated = {
      ...userData,
      cpf: null,
    };

    mockCompanyUserEntity.validateCompany.mockReturnValueOnce(undefined);
    mockAddressEntity.validateAddress.mockReturnValueOnce(undefined);

    const result = await userEntity.validate(userData);

    expect(mockCompanyUserEntity.validateCompany).toHaveBeenCalledWith(userData);
    expect(mockAddressEntity.validateAddress).toHaveBeenCalledWith(userData.address);
    expect(result).toEqual(validatedUser);
  });

  it('should throw AppError if emails do not match', async () => {
    const userData: IEntryData = {
      personType: 'individual',
      cpf: '12345678901',
      email: 'test@example.com',
      confirmEmail: 'wrong@example.com',
      name: 'John Doe',
      mobile: '1234567890',
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
      await userEntity.validate(userData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('should throw AppError if terms are not accepted', async () => {
    const userData: IEntryData = {
      personType: 'individual',
      cpf: '12345678901',
      email: 'test@example.com',
      confirmEmail: 'test@example.com',
      name: 'John Doe',
      mobile: '1234567890',
      address: {
        postalCode: '12345678',
        street: 'Street Name',
        number: '123',
        city: 'City Name',
        district: 'District Name',
        state: 'ST',
      },
      acceptedTerms: false,
    };

    try {
      await userEntity.validate(userData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
