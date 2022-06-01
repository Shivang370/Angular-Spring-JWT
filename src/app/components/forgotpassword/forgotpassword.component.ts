import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CommonserviceService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  emailFlag :boolean=false;
  otpFlag :boolean=false;
  forgotFlag :boolean=true;

  Otpform=new FormGroup({
    otp: new FormControl('',Validators.required)})

  Forgotform=new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email])})

    showCreatePassword : boolean = false;
    showConfirmPassword : boolean = false;
    showCurrentPassword : boolean = false;

  Resetform=new FormGroup({
    newpassword: new FormControl('',[Validators.required]),
    confirmpassword: new FormControl('',[Validators.required])
  })

  get newpassword(){return this.Resetform.get('newpassword')}
  get confirmpassword(){return this.Resetform.get('confirmpassword')}

  constructor(private userService:UserService,private toastr:ToastrService,private router:Router,private cookieService:CookieService,private common:CommonserviceService) { }

  ngOnInit(): void {
  }

  get email(){return this.Forgotform.get('email')}

  submitForm()
  {
    let req = {
      "subject":"OTP for Reset-Password",
      "message":"Your OTP is : ",
      "to":this.email?.value
    }
       
      this.userService.sendEmail(req).subscribe(

        (response:any)=>{
          if(response.status=="OK")
          {
            this.emailFlag=true;
            this.forgotFlag=false;
              console.log(response);
              this.cookieService.set("email",req.to)
            this.toastr.success("OTP sent Successfully !!")
          }
          if(response.status=="BAD_REQUEST")
          {
            console.log(response);
            this.toastr.error("Entered email doesn't exist")
            setTimeout(()=>{
              this.router.navigate(['forgotpassword'])
            },1000)
          }
        },
        (error: HttpErrorResponse) => {
          
          this.toastr.error("Bad Credentials!!")
          setTimeout(()=>{
            this.router.navigate(['login'])
          },1000)
          }
        
       
      );
  }

  get otp(){return this.Otpform.get('otp')}

  submitOtpForm()
  {

    let req = {

      "otp":this.otp?.value,
    }

    this.userService.verifyotp(req).subscribe(
      (response:any)=>{
        if(response.status=="OK")
        {
          this.otpFlag=true;
          this.emailFlag=false;
          this.forgotFlag=false;
          console.log(response);
          this.toastr.success("OTP Verified !!")
        }
        if(response.status=="BAD_REQUEST")
          {
            console.log(response);
            this.toastr.error("Please enter correct OTP ")
            setTimeout(()=>{
              this.router.navigate(['verifyotp'])
            },1000)
          }
      }

    );
  }

  Cancel()
  {
    this.router.navigate(['dashboard'])
  }

  toggleCurrentPassword(){
    this.showCurrentPassword = !this.showCurrentPassword;
  }
  togglePassword(){
    this.showCreatePassword = !this.showCreatePassword;
  }
  toggleConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  showPassword(val:any) {
    this.common.showPassword(val);
  }

  onResetSubmit()
  {
    if(this.Resetform.valid && this.newpassword?.value==this.confirmpassword?.value)
    {
      const req={
        "newpassword":this.newpassword?.value
      }
      this.userService.resetpassword(req).subscribe(
        
        
        (response:any) => {

          if(response.status=="OK")
          {
            this.toastr.success(response.description)
            setTimeout(()=>{
              this.router.navigate(['login'])
            },1000)
          }

          },
          (error: HttpErrorResponse) => {
          
            this.toastr.error("Your Session expired.. Login Again !!")
            setTimeout(()=>{
              this.router.navigate(['login'])
            },1000)
            }
        );
      }
    else
    { 
      this.toastr.error("Confirm Password do not match !!")
    }
  }


}
