import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { IIngredient } from 'src/app/model/ingredient.model';
import { IngredientService } from 'src/app/service/ingredient.service';

@Component({
  selector: 'app-ingredient-page',
  templateUrl: 'ingredient.page.html',
  styleUrls: ['ingredient.page.scss']
})
export class IngredientPage implements OnInit {
  protected searchControl: FormControl<string> = new FormControl();
  protected ingredients: IIngredient[] = [];
  constructor(private _ingredientService: IngredientService,
    private _navCtrl: NavController
  ) {}

  ngOnInit(): void {
      this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged(),
      switchMap((searchStr)=>( this._ingredientService.query().pipe(map(res=>res.body) ))))
      .subscribe({
        next: (response)=>{
          if(response){
            this.ingredients.push(...response);
          }
        }
      })
  }

  protected new(){
     this._navCtrl.navigateForward('/tabs/ingredient/new');
  }

}
