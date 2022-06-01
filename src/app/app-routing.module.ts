import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { HomeComponent } from './components/home/home.component';
import { ListuserComponent } from './components/listuser/listuser.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyotpComponent } from './components/verifyotp/verifyotp.component';
import { AuthGuard } from './services/auth.guard';



const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'

  },
  {
    path:"login",
    component:LoginComponent,
    pathMatch:"full"
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    pathMatch:"full",
    canActivate:[AuthGuard]
  },
  {
    path:"register",
    component:RegisterComponent,
    pathMatch:"full",
    canActivate:[AuthGuard]
  },
  {
    path:"listusers",
    component:ListuserComponent,
    pathMatch:"full",
    canActivate:[AuthGuard]
  },
  {
    path:"changepassword",
    component:ChangePasswordComponent,
    pathMatch:"full",
    canActivate:[AuthGuard]
  },
  {
    path:"forgotpassword",
    component:ForgotpasswordComponent,
    pathMatch:"full",
  },
  {
    path:"verifyotp",
    component:VerifyotpComponent,
    pathMatch:"full",
    // canActivate:[AuthGuard]  
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
