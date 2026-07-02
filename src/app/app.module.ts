import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/comp/navbar/navbar.component';
import { HomeDashComponent } from './shared/comp/home-dash/home-dash.component';
import { UsersDashComponent } from './shared/comp/users-dash/users-dash.component';
import { ProductsDashComponent } from './shared/comp/products-dash/products-dash.component';
import { FairsDashComponent } from './shared/comp/fairs-dash/fairs-dash.component';
import { PageNotFoundComponent } from './shared/comp/page-not-found/page-not-found.component';
import { ProductFormComponent } from './shared/comp/product-form/product-form.component';
import { ProductDetailComponent } from './shared/comp/product-detail/product-detail.component';
import { GetConfirmComponent } from './shared/comp/product-detail/get-confirm/get-confirm.component';
import { UserFormComponent } from './shared/comp/users-dash/user-form/user-form.component';
import { UserDetailComponent } from './shared/comp/users-dash/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeDashComponent,
    UsersDashComponent,
    ProductsDashComponent,
    FairsDashComponent,
    PageNotFoundComponent,
    ProductFormComponent,
    ProductDetailComponent,
    GetConfirmComponent,
    UserFormComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
