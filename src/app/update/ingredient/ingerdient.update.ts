import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { map, take } from "rxjs";
import { IIngredient, Ingredient } from "src/app/model/ingredient.model";
import { IngredientService } from "src/app/service/ingredient.service";

@Component({
    selector: 'app-ingredient-update',
    templateUrl: './ingredient.update.html',
    styleUrl: './ingredient.update.scss'
})
export class IngredientUpdateComponent implements OnInit{
    protected editForm: FormGroup = this._fb.group({
        id: [null],
        name: ['', [Validators.required]],
        description: [''],
        quantity: ['', [Validators.required]],
        cost: ['', [Validators.required]],
        unit: ['', [Validators.required]],
        image: [''],
        minQuantity: ['', [Validators.required]]
    })
    protected isDetailsExpanded: boolean = false;
    protected isInventoryExpanded: boolean = false;
    protected isLoading: boolean = false;

    constructor(private _fb: FormBuilder, private _ingredientService: IngredientService){}

    ionViewWillEnter(){

    }

    ngOnInit(): void {
        
    }

    save(){
        this.subscribeToSaveResponse().pipe(map((res)=>(res.body))).subscribe({
            next: (response)=>{
               this.onSaveSuccess(response);
            }
        })
        
    }

    private onSaveSuccess(ingredient: IIngredient | null){
       this.editForm.reset(ingredient);
       this.isLoading = false;
    } 

    private subscribeToSaveResponse(){
        const ingredient = this.editForm.value as IIngredient;
        if(ingredient.id){
           return this._ingredientService.update(ingredient)
        }
        else{
           return this._ingredientService.create(ingredient)
        }
    }
}