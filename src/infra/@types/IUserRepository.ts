import IEntryData, { IAddress } from 'src/types/modules/data';

type IUserBody = IEntryData;

export default interface IUserRepository {
  insert: (userValidated: IUserBody) => Promise<IUserBody>;
  findOrCreateAddress: (userValidated: IUserBody) => Promise<IAddress>;
}

export { IUserBody };
