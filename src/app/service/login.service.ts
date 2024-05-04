import { HttpClient, HttpClientModule, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { SERVER_API_URL } from "src/environments/server-api-url";
import { IUserInfo, UserInfo } from "../model/user-info.model";
import { ITenant } from "../model/tenant.model";
@Injectable({
    providedIn: 'root'
})
export class LoginService{
    readonly resourceUrl = SERVER_API_URL + '/user';

    constructor(private http: HttpClient){}

    public checkEmailAvailability(emailId: string): Observable<HttpResponse<boolean>>{
       return this.http.get<boolean>(`${this.resourceUrl}/check-email-availability`, {observe: 'response', params: { email: emailId}});
    }

    public registerUserWithTenant(registrationDto : {userInfo: IUserInfo, tenant: ITenant}): Observable<HttpResponse<boolean>>{
        return this.http.post<boolean>(`${this.resourceUrl}/register`, registrationDto, {observe: 'response'}).pipe(take(1));
    }

    public login(body: {username: string, password: string}): Observable<HttpResponse<boolean>>{
        return this.http.post<boolean>(`${this.resourceUrl}/authenticate`, body, {observe: 'response'}).pipe(take(1));
    }
    
}