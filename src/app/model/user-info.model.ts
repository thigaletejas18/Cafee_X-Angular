import { Authority } from "../enums/Authority.enum";
import * as dayjs from 'dayjs';

export interface IUserInfo{
   id?: string,
   firstName?: string,
   lastName?: string,
   email?: string,
   roles?: string,
   mobileNumber?: number,
   designation?: string,
   address?: string,
   createdBy?: string,
   updatedBy?: string,
   createDate?: dayjs.Dayjs,
   updateDate?: dayjs.Dayjs,
   password?: string
}


export class UserInfo implements IUserInfo {
   public id?: string;
   public firstName?: string;
   public lastName?: string;
   public email?: string;
   public roles?: string;
   public mobileNumber?: number;
   public designation?: string;
   public address?: string;
   public createdBy?: string;
   public updatedBy?: string;
   public createDate?: dayjs.Dayjs;
   public updateDate?: dayjs.Dayjs;
   public password?: string;
  
    constructor() {}
}