import UserAdapter from 'src/app/adapters/UserAdapter';
import AppError from 'src/domain/errors/AppError';
import { IEntryData, IUserBodyValidated } from 'src/domain/@types/IUserEntity';

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
};
const mockUserUseCase = {
  insertUser: jest.fn(),
};
const mockUserEntity = {
  validate: jest.fn(),
};

describe('UserAdapter', () => {
  let userAdapter: UserAdapter;

  beforeEach(() => {
    userAdapter = new UserAdapter({
      logger: mockLogger as any,
      userUseCase: mockUserUseCase,
      userEntity: mockUserEntity,
    });
  });

  it('should call userEntity.validate and userUseCase.insertUser', async () => {
    const userData: IEntryData = {
      personType: 'individual',
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
      acceptedTerms: true,
    };

    const validatedUser: IUserBodyValidated = {
      ...userData,
    };

    mockUserEntity.validate.mockResolvedValueOnce(validatedUser);

    await userAdapter.prepareUserData(userData);

    expect(mockUserEntity.validate).toHaveBeenCalledWith(userData);
    expect(mockUserUseCase.insertUser).toHaveBeenCalledWith(validatedUser);
  });

  it('should throw AppError if validation fails', async () => {
    mockUserEntity.validate.mockRejectedValueOnce(new AppError({ message: 'Validation failed' }));
  
    const userData: IEntryData = {
      personType: 'individual',
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
      acceptedTerms: true,
    };
  
    try {
      await userAdapter.prepareUserData(userData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.error.message).toBe('Validation failed');
      expect(error.error.error_code).toBe(400);
    }
  });
});
