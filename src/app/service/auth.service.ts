import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { SERVER_API_URL } from "src/environments/server-api-url";
import { IUserInfo } from "../model/user-info.model";
import { Router } from "@angular/router";

export const jwtTokenKey = 'jwtToken';
export const credentialsKey = 'credentials';
export const rememberKey = 'rememberMe';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private _router: Router) { }

    private account: BehaviorSubject<IUserInfo | null> = new BehaviorSubject<IUserInfo | null>(null);
    private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


    login(username: string, password: string, rememberMe: boolean): Observable<boolean> {
        return this.http.post<any>(`${SERVER_API_URL}/user/authenticate`, { username: username, password: password }, { observe: 'response' })
            .pipe(map(res => {
                const response = res.body;
                if (response.jwtToken) {
                  this.storeAuthenticationResponse(response, username, password, rememberMe);
                  this.isAuthenticated.next(true);
                  return true;
                }
                return false;
            }))
    }

    storeAuthenticationResponse(response: { jwtToken: string, userInfoDetails: IUserInfo }, username: string, password: string, rememberMe: boolean) {
        sessionStorage.setItem(jwtTokenKey, response.jwtToken);
        localStorage.setItem(jwtTokenKey, response.jwtToken);
        sessionStorage.setItem(credentialsKey, JSON.stringify({ username: username, password: password }));
        localStorage.setItem(credentialsKey, JSON.stringify({ username: username, password: password }));
        sessionStorage.setItem(rememberKey, JSON.stringify(rememberMe));
        localStorage.setItem(rememberKey, JSON.stringify(rememberMe));
        this.account.next(response.userInfoDetails);
    }

    getIsAuthenticated(): boolean{
       return sessionStorage.getItem(jwtTokenKey) || localStorage.getItem(jwtTokenKey) ? true : false;
    }

    logout(){
        sessionStorage.removeItem(jwtTokenKey);
        localStorage.removeItem(jwtTokenKey);
        sessionStorage.removeItem(credentialsKey);
        localStorage.removeItem(credentialsKey);
        this._router.navigate(['login']);
    }
}