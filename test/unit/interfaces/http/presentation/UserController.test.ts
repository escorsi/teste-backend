import { Request, Response } from 'express';
import UserController from 'src/interfaces/http/presentation/UserController';
import AppError from 'src/domain/errors/AppError';
import { IEntryData } from 'src/domain/@types/IUserEntity';

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
};

const mockUserAdapter = {
  prepareUserData: jest.fn(),
};

describe('UserController', () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    userController = new UserController({
      logger: mockLogger as any,
      userAdapter: mockUserAdapter as any,
    });

    sendMock = jest.fn();
    statusMock = jest.fn(() => ({
      json: sendMock,
    })) as any;

    mockRequest = {
      body: {
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
      },
    };

    mockResponse = {
      status: statusMock,
    };
  });

  it('should call userAdapter.prepareUserData and return success response', async () => {
    const userData: IEntryData = mockRequest.body as IEntryData;

    await userController.createUser(mockRequest as Request, mockResponse as Response);

    expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Initiating user creation process'));
    expect(mockUserAdapter.prepareUserData).toHaveBeenCalledWith(userData);
    expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('User successfully created'));
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(sendMock).toHaveBeenCalledWith({
      message: 'User created successfully',
    });
  });

  it('should handle errors and throw AppError', async () => {
    mockUserAdapter.prepareUserData.mockRejectedValueOnce(new AppError({ message: 'Validation failed' }));
  
    try {
      await userController.createUser(mockRequest as Request, mockResponse as Response);
    } catch (error: any) {
      expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('error : Validation failed'));
      expect(error).toBeInstanceOf(AppError);
      expect(error.error.message).toBe('Validation failed');
    }
  });
});
