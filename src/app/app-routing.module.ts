import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from './page/sign-up/sign-up.page';
import { LoginPageComponent } from './page/login/login.page';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./page/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [()=>{ 
      const authService = inject(AuthService);
      const router = inject(Router);
      if(!authService.getIsAuthenticated()){ router.navigate(['login']) }
      return authService.getIsAuthenticated();
    }],
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
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
