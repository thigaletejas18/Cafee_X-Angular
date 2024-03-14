import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ExploreContainerComponentModule } from "src/app/explore-container/explore-container.module";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginPageComponent } from "./login.page";
import { RouterModule, Routes } from "@angular/router";

const routes : Routes =[
    {
      path: 'login',
      component: LoginPageComponent,
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    }
]

@NgModule({
    imports:[
      SharedModule,
      RouterModule.forChild([...routes])
    ],
    declarations: [LoginPageComponent]
})
export class LoginPageModule{}