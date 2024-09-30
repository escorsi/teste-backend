import AppError from 'src/domain/errors/AppError';
import IAddressEntity, { IAddress } from 'src/domain/@types/IAddressEntity';

export default class AddressEntity implements IAddressEntity {
  validateAddress(addressData: IAddress): void {
    if (!addressData.postalCode || addressData.postalCode.length !== 8) {
      throw new AppError('Postal code is invalid');
    }

    if (!addressData.street || !addressData.number || !addressData.city || !addressData.state) {
      throw new AppError('Address is incomplete');
    }
  }
}
