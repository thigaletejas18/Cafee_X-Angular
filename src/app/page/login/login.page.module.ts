import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ExploreContainerComponentModule } from "src/app/explore-container/explore-container.module";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginPageComponent } from "./login.page";
import { RouterModule, Routes } from "@angular/router";
import { TestDirective } from "src/app/test.directive";

const routes : Routes =[
    {
      path: '',
      component: LoginPageComponent,
    },
]

@NgModule({
    imports:[
      SharedModule,
      RouterModule.forChild(routes)
    ],
    declarations: [LoginPageComponent, TestDirective]
})
export class LoginPageModule{}