import UserUseCase from 'src/app/usecases/UserUseCase';
import { IEntryData, IUserBodyValidated } from 'src/domain/@types/IUserEntity';
import AppError from 'src/domain/errors/AppError';

const mockUserRepository = {
  insert: jest.fn(),
};

describe('UserUseCase', () => {
  let userUseCase: UserUseCase;

  beforeEach(() => {
    userUseCase = new UserUseCase({
      userRepository: mockUserRepository as any,
    });
  });

  it('should call userRepository.insert with validated user data', async () => {
    const userValidated: IUserBodyValidated = {
      personType: 'individual',
      cpf: '12345678901',
      name: 'John Doe',
      mobile: '1234567890',
      phone: null,
      email: 'test@example.com',
      confirmEmail: 'test@example.com',
      address: {
        postalCode: '12345678',
        street: 'Street Name',
        number: '123',
        complement: null,
        city: 'City Name',
        district: 'District Name',
        state: 'ST',
      },
      acceptedTerms: true,
    };

    mockUserRepository.insert.mockResolvedValueOnce(userValidated);

    const result = await userUseCase.insertUser(userValidated);

    expect(mockUserRepository.insert).toHaveBeenCalledWith(userValidated);
    expect(result).toEqual(userValidated);
  });

  it('should throw AppError if repository insert fails', async () => {
    const userValidated: IUserBodyValidated = {
      personType: 'individual',
      cpf: '12345678901',
      name: 'John Doe',
      mobile: '1234567890',
      phone: null,
      email: 'test@example.com',
      confirmEmail: 'test@example.com',
      address: {
        postalCode: '12345678',
        street: 'Street Name',
        number: '123',
        complement: null,
        city: 'City Name',
        district: 'District Name',
        state: 'ST',
      },
      acceptedTerms: true,
    };

    mockUserRepository.insert.mockRejectedValueOnce(new AppError({ message: 'Insertion failed' }));

    try {
      await userUseCase.insertUser(userValidated);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.error.message).toBe('Insertion failed');
      expect(error.error.error_code).toBe(400);
    }
  });
});
