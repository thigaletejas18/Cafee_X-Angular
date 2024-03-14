import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, PatternValidator, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, IonIcon, IonInput, IonLoading, LoadingController } from "@ionic/angular";
import { IonRouterOutlet, NavController } from "@ionic/angular/common";
import { map, take } from "rxjs";
import { AlertService } from "src/app/service/alert.service";
import { LoaderService } from "src/app/service/loader.service";
import { LoginService } from "src/app/service/login.service";
import { matchingFiledsValidator, minLengthNumberValidator, passwordValidator } from "src/app/shared/validators";
import Swiper from 'swiper';

@Component({
  templateUrl: './sign-up.page.html',
  styleUrl: './sign-up.page.scss',
  selector: 'app-login-page'
})
export class SignUpPageComponent implements AfterViewInit, OnInit {
  @ViewChild('swiperEl') swiperElm: ElementRef = new ElementRef('swiperEl');
  swiperRef: Swiper = new Swiper('');
  loader: any = undefined;
  userForm: FormGroup = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    mobileNumber: [null, [Validators.required, minLengthNumberValidator(10)]],
    address: [null]
  })

  tenantForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    contactNumber: [null, [Validators.required, minLengthNumberValidator(10)]],
    address: [null, [Validators.required]]
  })

  passwordForm: FormGroup = this.fb.group({
    password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(12), passwordValidator()]],
    confirmPassword: [null, [Validators.required]]
  },
    {
      validator: matchingFiledsValidator('password', 'confirmPassword')
    })

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private alertService: AlertService,
    private navCtrl: NavController,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ionViewWillEnter() {

  }

  ionViewDidLeave() {

  }

  ngAfterViewInit(): void {
    this.swiperRef = new Swiper(this.swiperElm?.nativeElement, {
      allowTouchMove: false
    })
  }

  protected nextStep(slide: number): void {
    if (slide === 0) {
      this.loaderService.startLoading();
      this.loginService.checkEmailAvailability(this.userForm.get('email')?.value).pipe(take(1), map(res => res.body))
        .subscribe({
          next: (res) => {
            this.loaderService.stopLoading();
            if (res) {
              this.swiperRef.slideTo(1);
            }
            else {
              this.alertService.openAlert('Email Id Already Used',
                'Kindly Login with exixting account or use another Email for Sign Up'
                , [{ text: 'Login', handler: () => { this.navCtrl.navigateBack('login'); } }, { text: 'Ok', role: 'confirm' }],
                'This Email Id is already in use.');
            }
          },
          error: (err) => { }
        })
    }
    else if (slide === 1) {
      this.swiperRef.slideTo(2);
    }
    else if (slide === 2) {
      this.startLoader();
      this.loginService.registerUserWithTenant({userInfo: {...this.userForm.value, password: this.passwordForm.value.password}, tenant: this.tenantForm.value}).pipe
      (map(res=>res.body)).subscribe({
        next: (response)=>{
          if(response){
            this.router.navigate(['login']);
          }
        }
      })
    }
  }

  async startLoader() {
    this.loader = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circular',
    });
    await this.loader.present();
    this.loader.dismiss();
  }

  async stopLoader() {
    await this.loader.dismiss();
  }


  protected showPassword(elm: IonInput, icon: IonIcon) {
    if (elm.type === 'text') {
      elm.type = 'password';
      icon.name = 'eye'
    }
    else {
      elm.type = 'text';
      icon.name = 'eye-off'
    }
  }

  protected prevStep(): void {

  }

  protected isNextDisabled(slide: number): boolean {
    if (slide === 0) {
      return this.userForm.invalid;
    }
    else if (slide === 1) {
      return this.tenantForm.invalid;
    }
    else if (slide === 2) {
      return this.passwordForm.invalid;
    }
    return false;
  }



}