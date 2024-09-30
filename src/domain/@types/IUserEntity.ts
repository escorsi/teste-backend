import IEntryData from 'src/types/modules/data';

type IUserBodyValidated = IEntryData;

export default interface IUserEntity {
  validate: (userData: IEntryData) => Promise<IUserBodyValidated>;
}

export { IEntryData, IUserBodyValidated };
