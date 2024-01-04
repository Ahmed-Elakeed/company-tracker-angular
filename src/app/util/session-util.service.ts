import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SessionUtilService {

  constructor(private router:Router) { }

  public getLoginData(){
    // let loginData = {
    //   "token": ???,
    //   "email": ???,
    //   "id": ???,
    //   "name": ???
    //   "role": ???
    // }

    // @ts-ignore
    return JSON.parse(localStorage.getItem("loginData"));
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
