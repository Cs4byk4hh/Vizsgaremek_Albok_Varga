import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { PerfumesComponent } from './perfumes/perfumes.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './home/home.component';
import { KapcsolatComponent } from './kapcsolat/kapcsolat.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'velemenyek', component: OpinionsComponent},
  {path: 'perfumes', component: PerfumesComponent},
  {path: 'kapcsolat', component: KapcsolatComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
