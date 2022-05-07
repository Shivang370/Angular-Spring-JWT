import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  url="http://localhost:8080"

  constructor(private http:HttpClient,private cookieService:CookieService){}
  
  register(credentials:any)
  {
    console.log(credentials);

    let options: any ={};
    options.headers = new HttpHeaders();
    // let token=localStorage.getItem("token");
    let token=this.cookieService.get("token");
    options.headers = options.headers.append("token",token);
    return this.http.post(this.url+"/register",credentials,options)
  }
}
