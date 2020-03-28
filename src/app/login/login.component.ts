import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  isLoading = false;
  authStatusSub: Subscription;

  constructor() {}

  ngOnInit() {
    // this.authStatusSub =this.authService.getAuthStatusListener().subscribe(
    //   suthStatus => {
    //     this.isLoading = false;
    //   }
    // );
  }

  onLogin(form: NgForm) {
   if (form.invalid) {
     return;
   }
   this.isLoading = true;
  //  this.authService.loginUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    // this.authStatusSub.unsubscribe();
  }
}
