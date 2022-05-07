import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://localhost:8080"

  constructor(private http:HttpClient,private cookieService:CookieService) { }
  
  generateToken(credentials:any)
  {
    return this.http.post(this.url+"/authenticate",credentials)
  }

  loginUser(token:string,username:string)
  {
    this.cookieService.set("token",token);
    this.cookieService.set("loggedUser",username);


    // localStorage.setItem("token",token);
    // localStorage.setItem("loggedUser",username)
    return true;
  }

  isLoggedIn()
  {
    // let token=localStorage.getItem("token");
    let token=this.cookieService.get("token");
    if(token==undefined || token==='' || token==null)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  Logout()
  {
    this.cookieService.delete("token");
    // localStorage.removeItem("token");
    return true;
  }

  getToken()
  {
    this.cookieService.get("token");
    // localStorage.getItem("token");
  }
}
