import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from './page/sign-up/sign-up.page';
import { LoginPageComponent } from './page/login/login.page';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./page/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.page.module').then(m=> m.LoginPageModule) 
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./page/sign-up/sign-up.page.module').then(m=> m.SignUpPageModule) 
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () => import('./page/tabs/tabs.module').then(m=>m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
