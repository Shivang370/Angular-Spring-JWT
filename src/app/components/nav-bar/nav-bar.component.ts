import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public loggedIn=false;

  baseurl="http://localhost:8080"

  userDisplayName:any;

  menuDisplay:boolean  = false;

  constructor(private loginService:LoginService,private http:HttpClient,private cookieService:CookieService,private router:Router,public socialAuthServive: SocialAuthService) { }


  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn()
    // this.userDisplayName = localStorage.getItem('loggedUser');
    this.userDisplayName = this.cookieService.get('loggedUser');


  }

  handleDropDown(){
    this.menuDisplay = !this.menuDisplay;
  }

  logoutUser()
  {
    this.loginService.Logout()
    this.socialAuthServive.signOut()
    location.reload()
  }

  changepassword()
  {
    this.router.navigate(['changepassword'])
  }

}
