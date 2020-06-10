import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './UI/header/header.component';
import { BodyComponent } from './body/body.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NoteCardComponent } from './body/note-card/note-card.component';
import { DropdownDirective } from './core/dropdown.directive';
import { RegisterComponent } from './register/register.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuardService } from './core/services/auth-guard.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { SearchComponent } from './UI/search/search.component'


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('623282683315-akr00c0eh91o0p4enn4boick58rfcq8q.apps.googleusercontent.com')
  }
]);

 
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    BodyComponent,
    NoteCardComponent,
    DropdownDirective,
    RegisterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    LoginModule,
    ColorPickerModule,
    SocialLoginModule
  ],
  providers: [RouterModule, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
], 
  bootstrap: [AppComponent]
})
export class AppModule { }
