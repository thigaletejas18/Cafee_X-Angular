import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientPage } from './ingredient.page';
import { IngredientUpdateComponent } from 'src/app/update/ingredient/ingerdient.update';

const routes: Routes = [
  {
    path: '',
    component: IngredientPage,
  },
  {
    path: 'new',
    component: IngredientUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientPageRoutingModule {}
