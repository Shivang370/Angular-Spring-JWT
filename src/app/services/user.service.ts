import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from 'src/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl="http://localhost:8080"

  constructor(private http:HttpClient,private cookieService:CookieService) { }


  public getUsers(): Observable<User[]> {

    let options: any ={};
    options.headers = new HttpHeaders();
    let token=this.cookieService.get('token');
    // let token=localStorage.getItem("token");
    console.log(token);
    options.headers = options.headers.append("token",token);
    return this.http.get<User[]>(`${this.baseurl}/getUsers`,{headers:options.headers});
    
    }

    public findUserbyId(id:number):Observable<User>{
      let options: any ={};
      options.headers = new HttpHeaders();
      let token=this.cookieService.get('token');
      // let token=localStorage.getItem("token");
      options.headers = options.headers.append("token",token);
      return this.http.get<User>(`${this.baseurl}/getoneUser/${id}`,{headers:options.headers});
    }

    public UpdateUser(user:User):Observable<User>{

      let options: any ={};
      options.headers = new HttpHeaders();
      // let token=localStorage.getItem("token");
      let token=this.cookieService.get('token');
      options.headers = options.headers.append("token",token);
      return this.http.put<User>(`${this.baseurl}/updateUser`,user,{headers:options.headers});
    }

    public deleteUserbyId(id:number):Observable<void>{

      let options: any ={};
      options.headers = new HttpHeaders();
      let token=this.cookieService.get('token');
      // let token=localStorage.getItem("token");
      options.headers = options.headers.append("token",token);
      return this.http.delete<void>(`${this.baseurl}/deleteUser/${id}`,{headers:options.headers});
    }

    public changepassword(req:any)
    {
      let options: any ={};
      options.headers = new HttpHeaders();
      // let token=localStorage.getItem("token");
      let token=this.cookieService.get("token");

      console.log(token);
      

      options.headers = options.headers.append("token",token);

      return this.http.post(this.baseurl+"/changepassword",req,options);
  }

  public sendEmail(req:any)
  {
      return this.http.post(this.baseurl+"/sendemail",req);
  }

  public verifyotp(req:any)
  {
    console.log(req);
    
    let options: any ={};
      options.headers = new HttpHeaders();
      let email=this.cookieService.get("email");
      console.log(email);
      options.headers = options.headers.append("email",email);

    return this.http.post(this.baseurl+"/verifyotp",req,options);
  }

  public resetpassword(req:any)
  {
    let options: any ={};
    options.headers = new HttpHeaders();
    let email=this.cookieService.get("email");
    console.log(email);
    options.headers = options.headers.append("email",email);

    return this.http.post(this.baseurl+"/resetpassword",req,options);
}
}
