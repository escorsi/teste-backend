import IEntryData from 'src/types/modules/data';

type IUserBody = IEntryData;

export default interface IUserAdapter {
  prepareUserData: (body: IUserBody) => Promise<IUserBody>;
}

export { IUserBody };
