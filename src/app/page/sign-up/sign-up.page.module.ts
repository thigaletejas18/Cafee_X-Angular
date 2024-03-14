import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ExploreContainerComponentModule } from "src/app/explore-container/explore-container.module";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { SignUpPageComponent } from "./sign-up.page";

const routes : Routes =[
    {
      path: '',
      component: SignUpPageComponent,
    },
]

@NgModule({
    imports:[
      SharedModule,
      RouterModule.forChild([...routes])
    ],
    declarations: [SignUpPageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SignUpPageModule{}