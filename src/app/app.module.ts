import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NoteCardComponent } from './body/note-card/note-card.component';
import { DropdownDirective } from './core/dropdown.directive';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    BodyComponent,
    NoteCardComponent,
    DropdownDirective,
    RegisterComponent
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
    ColorPickerModule
  ],
  providers: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
