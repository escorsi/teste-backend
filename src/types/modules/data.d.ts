interface IAddress {
  postalCode: string;
  street: string;
  number: string;
  complement?: string | null;
  city: string;
  district: string;
  state: string;
}

export default interface IEntryData {
  personType: 'individual' | 'company';
  cnpj?: string | null;
  cpf?: string | null;
  responsibleCpf?: string | null;
  name: string;
  mobile: string;
  phone?: string | null;
  email: string;
  confirmEmail: string;
  address: IAddress;
  acceptedTerms: boolean;
}

export { IAddress };
