import IEntryData from 'src/types/modules/data';

type IUserBody = IEntryData;

export default interface IUserRepository {
  insert: (userValidated: IUserBody) => Promise<IUserBody>;
  findOrCreateAddress: (userValidated: IUserBody) => Promise<void>;
}

export { IUserBody };
