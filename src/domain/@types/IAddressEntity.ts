import { IAddress } from 'src/types/modules/data';

export default interface IAddressEntity {
  validateAddress: (addressData: IAddress) => void;
}

export { IAddress };
