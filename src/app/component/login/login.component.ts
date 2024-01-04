import {Component, OnInit} from '@angular/core';
import {LoginDTO} from "../../dto/LoginDTO";
import {AdminService} from "../../service/admin.service";
import {Router} from "@angular/router";
import {SessionUtilService} from "../../util/session-util.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginDTO: LoginDTO = new LoginDTO();
  public invalidCredentials=false;


  ngOnInit(): void {
    const loginData = this.sessionUtil.getLoginData();
    if (loginData?.token != null && loginData?.token != '') {
      this.router.navigate(['/departments']);
    }
  }
  constructor(private adminService: AdminService,private router:Router, private sessionUtil:SessionUtilService) {
  }

  login() {
    this.adminService.adminLogin(this.loginDTO).subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.invalidCredentials = false;
          let loginData = {
            "token":response.data.token,
            "email":response.data.email,
            "id":response.data.id,
            "role":response.data.role
          }
          localStorage.setItem("loginData", JSON.stringify(loginData))
          sessionStorage.setItem("loginData", JSON.stringify(loginData))
          this.router.navigate(['/departments']);
        } else {
          this.invalidCredentials = true;
          this.loginDTO = new LoginDTO();
        }
      }
    )
  }
}
