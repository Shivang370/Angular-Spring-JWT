import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit {

  otpEntered!: number;
  
  constructor(private userService:UserService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
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
