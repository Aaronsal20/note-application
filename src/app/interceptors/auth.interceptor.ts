import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
        const authToken = this.authService.getToken();
        console.log("AuthInterceptor -> authToken", authToken);
        let newRequest;
        newRequest = req.clone({
        url: `${environment.apiUrl}/${req.url}`,
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
        console.log('TCL: AuthHttpInterceptor -> newRequest', newRequest);
        return next.handle(newRequest);
    }
}