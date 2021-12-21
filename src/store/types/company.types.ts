import { BaseAction, Concat } from './index';
import { GET_COMPANY_LIST, SUCCESS } from '../actionTypes';
import { City } from './definition.types';

export type CompanyTypes = {
  partnerId: number;
  partnerCode: string;
  name: string;
  email: string;
  isInsurancePartner: null | string;
  isSupplierPartner: null | string;
  cityId: number;
  address: string;
  taxNumber: string;
  taxOffice: string;
  phone: string;
  secondPhone: null | string;
  description: string;
  createdDate: string;
  creatorId: number;
  modifiedDate: null | string;
  modifiedId: null | string;
  isValid: boolean;
  //TODO: как узнаем тип массива изменить any
  contracts: any[];
  nonCurrAssetsPartner: any[];
  nonCurrAssetsInsurancePartner: any[];
  city: City;
};

export interface CompanyState {
  companyList: CompanyTypes[] | [];
}

export interface GetCompanyList extends BaseAction<typeof GET_COMPANY_LIST> {}
export interface GetCompanyListSuccess
  extends BaseAction<Concat<typeof GET_COMPANY_LIST, typeof SUCCESS>> {
  response: {
    resultStatus: boolean;
    resultObject: CompanyTypes[];
  };
}

export type CompanyActions = GetCompanyList | GetCompanyListSuccess;