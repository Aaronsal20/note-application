import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public authService: AuthenticationService, public router: Router) {}

    canActivate(): boolean {
        const isAuth = this.authService.isAuth();
        if (!isAuth) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}