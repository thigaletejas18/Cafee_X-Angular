import { Authority } from "../enums/Authority.enum";
import * as dayjs from 'dayjs';

export interface ITenant{
   id?: string,
   name?: string,
   email?: string,
   address?: string,
   contactNumber?: number,
   createDate?: dayjs.Dayjs;
   createdBy?: string;
   updateDate?: dayjs.Dayjs;
   updatedBy?: string
}

export class Tenant implements ITenant {
   public id?: string;
   public name?: string;
   public email?: string;
   public address?: string;
   public contactNumber?: number;
   public createDate?: dayjs.Dayjs;
   public createdBy?: string;
   public updateDate?: dayjs.Dayjs;
   public updatedBy?: string
  
   constructor() {}
}

