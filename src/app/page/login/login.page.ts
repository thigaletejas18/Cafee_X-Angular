import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, debounce, debounceTime, distinctUntilChanged, of, switchMap, tap, timeInterval, timeout } from "rxjs";
import { AuthService } from "src/app/service/auth.service";
import { LoginService } from "src/app/service/login.service";
import { logoUrl } from "src/assets/logos/logo.url";

@Component({
    templateUrl: './login.page.html',
    styleUrl: './login.page.scss',
    selector: 'app-login-page'
})
export class LoginPageComponent {
    readonly logoUrl = logoUrl;

    form = new FormGroup({
        username: new FormControl<string>('', [Validators.required]),
        password: new FormControl<string>('', [Validators.required])
    });
    test: BehaviorSubject<string> = new BehaviorSubject('');
    constructor(private activatedRote: ActivatedRoute,private loginService: LoginService, private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {

    }

    ionViewWillEnter() {
        
        this.test.pipe()
        .subscribe({
            next: (res: any)=>{
            console.log('log: '+res);
        },
        error: ()=>{},
        complete: ()=>{console.log('complete')}
    })
        
    }

    ionViewDidLeave() {

    }

    login() {
        console.log('next');
         this.test.next('hbj');
        
        // const value = this.form.value;
        // if (value.username && value.password) {
        //     this._authService.login(value.username, value.password, false).subscribe((response) => {
        //         if (response) {
        //             this._router.navigate(['app']);
        //         }
        //         else {
        //             //alert
        //             console.log('invalid')
        //         }
        //     });
        // }
    }


    
}