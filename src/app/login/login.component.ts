import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/services/auth.service'
import { pipe } from 'rxjs';

// import { AlertService, AuthenticationService } from '../_services';

@Component({templateUrl: 'login.component.html',
styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    PROVIDER_ID = '623282683315-akr00c0eh91o0p4enn4boick58rfcq8q.apps.googleusercontent.com';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
       ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        // this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        console.log("dddd")
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
        console.log("LoginComponent -> onSubmit -> res", res)
            
        });
        // this.authenticationService.login(this.f.username.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }

    // signInWithFB(): void {
    //     this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    //   }
      googleSignin() {
          this.authenticationService.signInWithGoogle();
      }
}
