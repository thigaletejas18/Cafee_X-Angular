import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './page/login/login.page';
import { SignUpPageComponent } from './page/sign-up/sign-up.page';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { AuthInterceptor } from './interceptors/auth.interceptors';
import { TestDirective } from './test.directive';
import { TestPipe } from './test.pipe';

@NgModule({
  declarations: [AppComponent, TestPipe],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
