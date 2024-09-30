import IEntryData from 'src/types/modules/data';

type IIndividualUserBody = IEntryData;

export default interface IIndividualUserEntity {
  validateIndividual: (userData: IIndividualUserBody) => void;
}

export { IIndividualUserBody };
