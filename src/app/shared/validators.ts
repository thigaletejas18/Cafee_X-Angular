import { AbstractControl, FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export function minLengthNumberValidator(minLength: number): ValidatorFn{
   return (control: AbstractControl) : {[key: string] : boolean} | null =>{
    let value = control?.value;
    value = Number(value)?.toString();
    if(value && value?.length !== minLength){
       return {invalid: true };
    }
    else{
      return null;
    }
   }
}

export function passwordValidator(): ValidatorFn{
   return (control: AbstractControl) : {[key: string] : boolean} | null =>{
      const value = control.value;
      const regexPatterns: Map<string, RegExp> = new Map<string, RegExp>([
         ['number', /\d/],
         ['upperCase', /[A-Z]/],
         ['lowerCase', /[a-z]/],
         ['specialChar', /[!@#$%^&*]/],
      ])
      let errors: {[key: string] : boolean} = {};
      regexPatterns.forEach((pattern, key)=>{
         if(!pattern.test(value)){
            errors[key] = true;
         }
      });
      return Object.keys(errors)?.length>0 ? errors : null;
   }
}

export function matchingFiledsValidator(fieldToMatchWith: string, fieldToMatch: string): ValidatorFn{
   return (formGroup: any): {[key: string] : boolean} | null =>{
      const value1= formGroup?.get(fieldToMatchWith)?.value;
      const value2= formGroup?.get(fieldToMatch)?.value;
      return value1 === value2 ? null : {[fieldToMatch + 'Mismatch']: true}
   }
}