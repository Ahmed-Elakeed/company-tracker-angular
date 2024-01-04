import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionUtilService {

  constructor() { }

  public getLoginData(){
    // let loginData = {
    //   "token": ???,
    //   "email": ???,
    //   "id": ???,
    //   "role": ???
    // }

    // @ts-ignore
    return JSON.parse(localStorage.getItem("loginData"));
  }
}
