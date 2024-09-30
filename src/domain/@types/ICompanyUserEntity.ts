import IEntryData from 'src/types/modules/data';

type ICompanyUserBody = IEntryData;

export default interface ICompanyUserEntity {
  validateCompany: (userData: ICompanyUserBody) => void;
}

export { ICompanyUserBody };
