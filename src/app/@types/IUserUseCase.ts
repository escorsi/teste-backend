import IEntryData from 'src/types/modules/data';

type IUserBody = IEntryData;

export default interface IUserUseCase {
  insertUser: (userValidated: IUserBody) => Promise<IUserBody>;
}

export { IUserBody };
