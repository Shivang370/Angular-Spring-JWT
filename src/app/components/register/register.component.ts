import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signup.service';
import { StoreModule } from '@ngrx/store';
import { CommonserviceService } from 'src/app/services/common.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  

  Signupform=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.maxLength(15)]),
    confirm_password:new FormControl('',[Validators.required]),
    contact: new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  })
  
  showCreatePassword : boolean = false;
  showConfirmPassword : boolean = false;

  constructor(private signupservice:SignupService,private toastr:ToastrService,private router:Router,private common:CommonserviceService) { }

  ngOnInit(): void {
  }
  get username(){return this.Signupform.get('username')}
  get password(){return this.Signupform.get('password')}
  get confirm_password(){return this.Signupform.get('confirm_password')}
  get email(){return this.Signupform.get('email')}
  get contact(){return this.Signupform.get('contact')}

  togglePassword(){
    this.showCreatePassword = !this.showCreatePassword;
  }
  toggleConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  showPassword(val:any) {
    this.common.showPassword(val);
  }
  
  onSubmit(){

    let credentials = {
      "username":this.username?.value,
      "email":this.email?.value,
      "password":this.password?.value,
      "confirm_password":this.confirm_password?.value,
      "contact":this.contact?.value
  
    }
    if(credentials.password==credentials.confirm_password)
    {
      this.signupservice.register(credentials).subscribe(
        (response:any)=>{
          console.log(response);
          this.toastr.success("SignUp Successful !!")
          setTimeout(()=>{
            this.router.navigate(['listusers'])
          },1000)
          
        },
       error=>
       {
         this.toastr.error("Your Session expired, Login Again!!")
         setTimeout(()=>{
          this.router.navigate(['login'])
        },1000)
         console.log(error);
       } 
      );
    }
    else
    {
      this.toastr.error("Passwords do not match !!")
    }
  }

}
  



