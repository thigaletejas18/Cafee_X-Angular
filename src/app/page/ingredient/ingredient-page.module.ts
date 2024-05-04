import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientPage } from './ingredient.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { IngredientPageRoutingModule } from './ingredient-page-routing.module';
import { EmptyStateComponent } from 'src/app/components/empty-state/empty-state.component';
import { IngredientUpdateComponent } from 'src/app/update/ingredient/ingerdient.update';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    IngredientPageRoutingModule
  ],
  declarations: [IngredientPage, EmptyStateComponent, IngredientUpdateComponent],
  schemas:[ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class IngredientPageModule {}
