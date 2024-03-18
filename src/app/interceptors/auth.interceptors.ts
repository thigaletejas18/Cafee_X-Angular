import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService, jwtTokenKey } from "../service/auth.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private _authService: AuthService, private _router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem(jwtTokenKey) || localStorage.getItem(jwtTokenKey);
        const request = token ? req.clone({
           setHeaders: {
            Authorization: `Bearer ${token}`
           }
        }) : req;
        return next.handle(request).pipe(catchError((error: HttpErrorResponse)=>{
            if(error.status === 403){
               this._authService.logout();
            }
            return throwError(error);
        }));
    }
}