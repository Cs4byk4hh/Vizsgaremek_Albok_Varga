import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OpinionsComponent } from './opinions/opinions.component';
import { PerfumesComponent } from './perfumes/perfumes.component';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { AdminComponent } from './admin/admin.component';
@NgModule({
  declarations: [  
  ],
  imports: [
    AppComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RegisterComponent,
    LoginComponent,
    OpinionsComponent,
    MatSnackBarModule,
    PerfumesComponent,
    CartDialogComponent,
    AdminComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
