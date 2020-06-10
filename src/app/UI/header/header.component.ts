import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/auth.service';
import { SocialUser, AuthService } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser: any;
  loggedIn: boolean;

  constructor(private authService: AuthenticationService, private router: Router, private socialAuthService: AuthService) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        console.log('HeaderComponent -> ngOnInit -> user', user);
        this.loggedUser = user;
        this.loggedIn = (user != null);
      } else {
        this.loggedUser =  {
          name: this.authService.getUserId()
        }
        console.log("HeaderComponent -> ngOnInit ->  this.loggedUser",  this.loggedUser)
      }
    });
  }

  signOut() {
    if(this.loggedIn) {
      console.log("HeaderComponent -> signOut -> this.loggedIn", this.loggedIn)
      this.authService.googleSignOut();
    } else {
      this.authService.logout()
    }
    
  }

 

}
