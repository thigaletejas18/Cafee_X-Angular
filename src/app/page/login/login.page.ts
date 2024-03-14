import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "src/app/service/login.service";
import { logoUrl } from "src/assets/logos/logo.url";

@Component({
    templateUrl: './login.page.html',
    styleUrl: './login.page.scss',
    selector: 'app-login-page'
})
export class LoginPageComponent{
    readonly logoUrl = logoUrl;

    form = new FormGroup({
        username: new FormControl<string>('', [Validators.required]),
        password: new FormControl<string>('', [Validators.required])
    });
    constructor(private loginService: LoginService, private _fb: FormBuilder){

    }

    ionViewWillEnter(){

    }

    ionViewDidLeave(){
        
    }

    login(){
        const value  = this.form.value;
        if(value.username && value.password){
            this.loginService.login({username: value.username, password: value.password}).subscribe((response)=>{
                


            });
        }
    }
}