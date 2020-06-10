import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AuthData } from './auth-data.model';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment'
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { User } from '../interfaces/intefaces';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const BACKEND_URL =  environment.apiUrl + '/user/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{
  
  private isAuthenticated = false;
  private token: string;
  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  private tokenTimer: any;
  loggedUser: SocialUser;
  private loggedIn: boolean;
  private user: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, public jwtHelper: JwtHelperService) {
    // this.currentUserSubject = new BehaviorSubject<User>(localStorage.getItem('currentUser'));
    this.user = localStorage.getItem('currentUser');
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    
  }

  getToken() {
    const usertoken = localStorage.getItem("token");
    this.token = usertoken;
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.user;
  }

  createUser(email: string, password: string, name: string) {
    const authData = {email: email, password: password, name: name};
    this.http.post('user/register', authData)
    .subscribe(res => {
    console.log("AuthService -> createUser -> res", res)
      this.router.navigate["/"];
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
    console.log("AuthenticationService -> signInWithGoogle -> res", res);
    this.saveAuthData(res.idToken, res.name)
        this.router.navigate(['/'])
    });
  }

  login(email: string, password: string) {
    console.log("AuthenticationService -> login -> email", email)
    const authData = { email: email, password: password };
    return this.http
      .post<any>('user/login',
        authData
      ).pipe(map(res => {
      console.log("AuthenticationService -> login -> res", res)
        // login successful if there's a jwt token in the response
      if (res && res.token) {
          const expiresInDuration = res.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.user = res.user;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(res.token, this.user, expirationDate);
          // this.currentUserSubject.next(res.user);
          this.router.navigate(['/']);
        }

        // return user;
      }));

      // .subscribe(response => {
      //   const token = response.token;
      //   this.token = token;
      //   if (token) {
      //     const expiresInDuration = response.expiresIn;
      //     this.setAuthTimer(expiresInDuration);
      //     this.isAuthenticated = true;
      //     this.user = response.user;
      //     this.authStatusListener.next(true);
      //     const now = new Date();
      //     const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      //     console.log(expirationDate);
      //     this.saveAuthData(token, expirationDate, this.user);
      //     this.router.navigate(["/"]);
      //   }
      // }, error => {
      //   this.authStatusListener.next(false);
      // });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.user = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  public isAuth(): boolean  {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.user = null;
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  googleSignOut(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, user: string, expirationDate?: Date) {
    localStorage.setItem("token", token);
    //  
    localStorage.setItem('currentUser',user);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("currentUser");
  }

  public getAuthData() {
    const usertoken = localStorage.getItem("token");
    console.log("AuthenticationService -> getAuthData -> token", usertoken)
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!usertoken || !expirationDate) {
      return;
    }
    return {
      token: usertoken,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
