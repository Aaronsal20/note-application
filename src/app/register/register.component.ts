import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
       ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirm: ['', Validators.required , ],
            name: ['', Validators.required],
        });

        // reset login status
        // this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    createUser() {
      console.log("Submitted");
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          console.log("dsdsds");
          return;
      }   
      this.authenticationService.createUser(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.name,)

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

    password() {
        const { value: password } = this.loginForm.get('password');
        const { value: confirmPassword } = this.loginForm.get('confirm');
        return password === confirmPassword ? null : { passwordNotMatch: true };
      }
}
