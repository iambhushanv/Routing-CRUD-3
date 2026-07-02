


export type TuserRole = 'Candidate' | 'Admin'

export interface Iuser {
  userName: string;
  userId: string;
  userRole: TuserRole;
  profileDescription: string;
  profileImage: string;
  skills: string[];
  experienceYears: string;
  isActive: boolean;
  address: IAddress;
  isAddSame: boolean;
}

export interface IAddress {
  current: ICurrent;
  permanent: IPermanent;
}

export interface ICurrent {
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface IPermanent {
  city: string;
  state: string;
  country: string;
  zipcode: string;
}