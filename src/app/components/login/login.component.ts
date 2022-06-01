import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonserviceService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { SocialAuthService, GoogleLoginProvider,SocialUser } from 'angularx-social-login';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  token: string|undefined;
  otpEntered!: number;

  otpFlag :boolean=false;
  loginFlag :boolean=true;
  emptyOtp :boolean=false;

  showCurrentPassword : boolean = false;

  loginform=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
    password: new FormControl('',[Validators.required])
  })

  get username(){return this.loginform.get('username')}
  get password(){return this.loginform.get('password')}

  constructor(private userService:UserService,private loginService:LoginService,private toastr:ToastrService,private router:Router,private common:CommonserviceService,private socialAuthService: SocialAuthService) {
    this.token = undefined;
  }

  toggleCurrentPassword(){
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  showPassword(val:any) {
    this.common.showPassword(val);
  }

  onOtpChange(event:any)
  {
    this.otpEntered=event;
    console.log(this.otpEntered);
    
  }

  Otp!: string; showOtpComponent = true; 
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any; config = { allowNumbersOnly: true, length: 4, isPasswordInput: false, disableAutoFocus: false, placeholder: "*", inputStyles: { width: "50px", height: "50px", }, };

  submitOtpForm()
  {

    let req = {

      "otp":this.otpEntered
    }
    debugger

    if(req['otp']==undefined)
    {
      this.emptyOtp=true;
      // this.toastr.error("Otp is Required");
    }
    else{
      this.userService.verifyotp(req).subscribe(
        (response:any)=>{
          if(response.status=="OK")
          {
              console.log(response);
            this.toastr.success("OTP Verified !!")
            setTimeout(()=>{
              this.router.navigate(['dashboard'])
            },1000)
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
  }
  loginWithGoogle(): void {
    console.log(GoogleLoginProvider.PROVIDER_ID);
    
    this.socialAuthService.signIn('133353123175-fqcak1hu7jeq97qoprhkkb1e2n2ik4t6.apps.googleusercontent.com')
      // .then(() => this.router.navigate(['dashboard']));
  }
   public ischeckedreCAPTCHA()
  {
    if(this.token==undefined)
    {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
  }
  onSubmit(){
    
    console.log(`Token [${this.token}] generated`);

    if((this.username?.value!=''&& this.password?.value!='')&&(this.username?.value!=null && this.password?.value!=null) && this.token!=undefined)
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
          this.otpFlag=true;
          this.loginFlag=false;
          this.toastr.success("Login Successful !!")
          this.router.navigate(['dashboard'])
          this.loginService.loginUser(response.token,credentials.username)
          
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
      if(this.token==undefined)
      {
        this.toastr.error("recaptcha required")
      }
    }
  }

  forgot()
  {
    this.router.navigate(['forgotpassword'])
  }

}
