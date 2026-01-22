import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { PerfumesComponent } from './perfumes/perfumes.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'velemenyek', component: OpinionsComponent},
  {path: 'perfumes', component: PerfumesComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
