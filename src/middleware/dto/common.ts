import type { Request } from 'express';

export interface RequestServiceUser extends Request {
  companyId: string;
  userPKId: string;
}

export enum LogContextNameEnum {
  I_UPDATE_USER_COMPANY_TAGS = 'I_UPDATE_USER_COMPANY_TAGS',
  I_NODEMAILER = 'I_NODEMAILER',
}

export enum ErrorContextNameEnum {
  E_UPDATE_USER_COMPANY_TAGS = 'E_UPDATE_USER_COMPANY_TAGS',
  E_KEYCLOACK_SERVICE = 'E_KEYCLOACK_SERVICE',
  E_MOBILE_SERVICE = 'E_MOBILE_SERVICE',
  E_NODEMAILER = 'E_NODEMAILER',
  E_JWT_ERROR = 'E_JWT_ERROR',
}
