import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { User } from 'src/User';
import { UserService } from 'src/app/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

  baseurl="http://localhost:8080"

   users: User[];
    editId!:number;
    editEmail:String=""
    editContact:String=""
    editName!:String;

  constructor(private Userservice:UserService,private http:HttpClient,private router:Router,private toastr:ToastrService){
    this.users=[]
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {

    this.Userservice.getUsers().subscribe(
    
    (response: User[]) => {
    
    this.users = response
    console.log(this.users);
    
    },
    
    (error: HttpErrorResponse) => {
    
    this.toastr.error("Your Session expired, Login Again!!")
    setTimeout(()=>{
      this.router.navigate(['login'])
    },1000)
    console.log(error,HttpErrorResponse);
    
    
    });
    }


    close(){
      document.querySelector(".edit-modal")?.classList.remove("visible")
    }

     deleteUser(id: number) {
      console.log(id);
       this.Userservice.deleteUserbyId(id).subscribe(
        (response: void) => {
  
          console.log(response);
          this.ngOnInit()
  
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
  
    }

    editUser(id:number){
      console.log(id);
      this.Userservice.findUserbyId(id).subscribe(
        (response:User)=>{
          console.log(response);
          this.editId = response.id
          this.editEmail= response.email
          this.editContact = response.contact
          this.editName = response.username
        
        }
      )
      document.querySelector(".edit-modal")?.classList.add("visible")
    }

    submitForm(){
      console.log(this.editContact);
      let obj:User= {
        "id":this.editId,
        "username":this.editName,
        "email":this.editEmail,
        "contact":this.editContact
      }
      this.Userservice.UpdateUser(obj).subscribe(
      (response:User)=>{
        console.log(response);
        this.getUsers()
        
      }
      )
      this.close()
      
    }

    registerpage()
    {
      this.router.navigate(['register'])
    }
    
  
    
}
