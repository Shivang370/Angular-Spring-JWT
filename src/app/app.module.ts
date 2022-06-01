import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { LoginService } from './services/login.service';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ListuserComponent } from './components/listuser/listuser.component';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgcCookieConsentModule,NgcCookieConsentConfig} from 'ngx-cookieconsent';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { VerifyotpComponent } from './components/verifyotp/verifyotp.component';


import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { cookieServiceFactory } from 'ngx-cookie';
import { AlphanumbersDirective } from './directives/alphanumbers.directive';
import { GoogleLoginProvider, SocialLoginModule,SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { UserService } from './services/user.service';



const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieDomain 
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ListuserComponent,
    ChangePasswordComponent,
    ForgotpasswordComponent,
    VerifyotpComponent,
    AlphanumbersDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    StoreModule,
    RecaptchaModule,
    SocialLoginModule,
    RecaptchaFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgOtpInputModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })

  ],
  providers: [LoginService,AuthGuard,[{provide:HTTP_INTERCEPTORS ,useClass:AuthInterceptor,multi:true}],[
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('133353123175-fqcak1hu7jeq97qoprhkkb1e2n2ik4t6.apps.googleusercontent.com') // your client id
        }
      ]
    } as SocialAuthServiceConfig
  },SocialAuthService,LoginService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
