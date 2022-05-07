import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonserviceService } from 'src/app/services/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  showCreatePassword : boolean = false;
  showConfirmPassword : boolean = false;
  showCurrentPassword : boolean = false;

  Changeform=new FormGroup({
    currentpassword:new FormControl('',Validators.required),
    newpassword: new FormControl('',[Validators.required]),
    confirmpassword: new FormControl('',[Validators.required])
  })

  get currentpassword(){return this.Changeform.get('currentpassword')}
  get newpassword(){return this.Changeform.get('newpassword')}
  get confirmpassword(){return this.Changeform.get('confirmpassword')}

  constructor(private router:Router,private toast:ToastrService,private Userservice:UserService,private common:CommonserviceService) { }

  ngOnInit(): void {
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

  onSubmit()
  {
    if(this.Changeform.valid && this.newpassword?.value==this.confirmpassword?.value)
    {
      const req={
        "currentpassword":this.currentpassword?.value,
        "newpassword":this.newpassword?.value
      }
      this.Userservice.resetpassword(req).subscribe(
        
        
        (response:any) => {

          if(response.status=="OK")
          {
            this.toast.success(response.description)
            setTimeout(()=>{
              this.router.navigate(['dashboard'])
            },1000)
          }

          if(response.status=="BAD_REQUEST")
          {
            this.toast.error(response.description)
          setTimeout(()=>{
            this.router.navigate(['changepassword'])
          },1000)
          }
          },
          (error: HttpErrorResponse) => {
          
            this.toast.error("Your Session expired.. Login Again !!")
            setTimeout(()=>{
              this.router.navigate(['login'])
            },1000)
            }
        );
      }
    else
    { 
      this.toast.error("Confirm Password do not match !!")
    }
  }
}
