import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonserviceService } from 'src/app/services/common.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  showCurrentPassword : boolean = false;

  loginform=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
    password: new FormControl('',[Validators.required])
  })

  get username(){return this.loginform.get('username')}
  get password(){return this.loginform.get('password')}

  constructor(private loginService:LoginService,private toastr:ToastrService,private router:Router,private common:CommonserviceService) {
  }

  toggleCurrentPassword(){
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  showPassword(val:any) {
    this.common.showPassword(val);
  }


  ngOnInit(): void {
  }
  onSubmit(){
    
    if((this.username?.value!=''&& this.password?.value!='')&&(this.username?.value!=null && this.password?.value!=null))
    {
      let username = this.username?.value
      let password = this.password?.value;
      console.log(username,password);
      
      console.log("Form Submitted !!");

      let credentials = {
        username:"",
        password:""
      }
      credentials.username=this.username?.value
      credentials.password=this.password?.value
      
      // Generating Token with given Credentials
      this.loginService.generateToken(credentials).subscribe(
        (response:any)=>{
          console.log(response);
          this.toastr.success("Login Successful !!")
          this.loginService.loginUser(response.token,credentials.username)
          setTimeout(()=>{
            this.router.navigate(['dashboard'])
          },1000)
          
        },
       error=>
       {
         this.toastr.error("Invalid Credentials !!")
         console.log(error);
       } 
      );

    }
    else
    {
      this.toastr.error("Fields are Empty!!")
      console.log("Fields are Empty !!");
    }
  }

}
