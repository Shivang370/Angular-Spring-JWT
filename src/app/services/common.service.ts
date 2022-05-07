import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor() { }

  /********** Show Password *******************************/
  showPassword(val = "") {
    let pass;
    if (val === 'current') {
      pass = (<HTMLInputElement>document.getElementById('currpassword'));
    } else
      if (val === 'conPass') {
        pass = (<HTMLInputElement>document.getElementById('conpassword'));
      } else
        if (val === 'newPass') {
          pass = (<HTMLInputElement>document.getElementById('password'));
        } else {
          pass = (<HTMLInputElement>document.getElementById('password'));
        }

    if (pass.type === "password") {
      pass.type = "text";
      
    } else {
      pass.type = "password";
    }
  }
  /*********** End Show Password *************************/
}
