import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'; 
import {Router} from '@angular/router';
import { User } from 'src/User';
import { HttpErrorResponse } from '@angular/common/http';
import { find } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private router:Router,private cookieService:CookieService) { }

  userDisplayName:any;

  ngOnInit() {
    //  this.userDisplayName = localStorage.getItem('loggedUser');
     this.userDisplayName = this.cookieService.get('loggedUser');
  }

  registerpage()
  {
    this.router.navigate(['register'])
  }
  getUser()
  {

    this.router.navigate(['listusers'])
  }

}
