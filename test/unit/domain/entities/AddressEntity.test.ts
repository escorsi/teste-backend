import AddressEntity from 'src/domain/entities/AddressEntity';
import AppError from 'src/domain/errors/AppError';
import { IAddress } from 'src/domain/@types/IAddressEntity';

describe('AddressEntity', () => {
  let addressEntity: AddressEntity;

  beforeEach(() => {
    addressEntity = new AddressEntity();
  });

  it('should throw AppError if postal code is invalid', () => {
    const invalidAddress: IAddress = {
      postalCode: '1234',
      street: 'Valid Street',
      number: '123',
      city: 'Valid City',
      district: 'Valid District',
      state: 'VS',
    };

    try {
      addressEntity.validateAddress(invalidAddress);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('should throw AppError if address is incomplete (missing street)', () => {
    const incompleteAddress: IAddress = {
      postalCode: '12345678',
      street: '',
      number: '123',
      city: 'Valid City',
      district: 'Valid District',
      state: 'VS',
    };

    try {
      addressEntity.validateAddress(incompleteAddress);
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
