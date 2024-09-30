import IndividualUserEntity from 'src/domain/entities/IndividualUserEntity';
import AppError from 'src/domain/errors/AppError';
import { IEntryData } from 'src/domain/@types/IUserEntity'; // Supondo que IEntryData seja o tipo correto

describe('IndividualUserEntity', () => {
  let individualUserEntity: IndividualUserEntity;

  beforeEach(() => {
    individualUserEntity = new IndividualUserEntity();
  });

  it('should throw AppError if CPF is missing', () => {
    const invalidUserData: IEntryData = {
      personType: 'individual',
      cpf: '', // CPF ausente
      name: 'John Doe',
      email: 'johndoe@example.com',
      confirmEmail: 'johndoe@example.com',
      mobile: '1234567890',
      address: {
        postalCode: '12345678',
        street: 'Main St',
        number: '123',
        city: 'City Name',
        district: 'District Name',
        state: 'ST',
      },
      acceptedTerms: true,
    };

    try {
      individualUserEntity.validateIndividual(invalidUserData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('should validate individual data when CPF is provided', () => {
    const validUserData: IEntryData = {
      personType: 'individual',
      cpf: '12345678901',
      name: 'John Doe',
      email: 'johndoe@example.com',
      confirmEmail: 'johndoe@example.com',
      mobile: '1234567890',
      address: {
        postalCode: '12345678',
        street: 'Main St',
        number: '123',
        city: 'City Name',
        district: 'District Name',
        state: 'ST',
      },
      acceptedTerms: true,
    };

    expect(() => individualUserEntity.validateIndividual(validUserData)).not.toThrow();
  });
});
