import { HttpClient, HttpClientModule, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { SERVER_API_URL } from "src/environments/server-api-url";
import { IUserInfo, UserInfo } from "../model/user-info.model";
import { ITenant } from "../model/tenant.model";
import { IIngredient, Ingredient } from "../model/ingredient.model";
@Injectable({
    providedIn: 'root'
})
export class IngredientService{
    readonly resourceUrl = SERVER_API_URL + '/ingredient';

    constructor(private http: HttpClient){}

    public query(): Observable<HttpResponse<IIngredient[]>>{
       return this.http.get<IIngredient[]>(`${this.resourceUrl}`, {observe: 'response'}).pipe(take(1));
    }

    public find(id: string): Observable<HttpResponse<IIngredient>>{
        return this.http.get<IIngredient>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(take(1));
    }

    public create(ingredient: IIngredient): Observable<HttpResponse<IIngredient>>{
        return this.http.post<IIngredient>(`${this.resourceUrl}`, ingredient, {observe: 'response'}).pipe(take(1));
    }

    public update(ingredient: IIngredient): Observable<HttpResponse<IIngredient>>{
        return this.http.put<IIngredient>(`${this.resourceUrl}`, ingredient, {observe: 'response'}).pipe(take(1));
    }
}