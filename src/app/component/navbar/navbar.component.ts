import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {SessionUtilService} from "../../util/session-util.service";
import {AdminRole} from "../../enums/AdminRole";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  protected readonly AdminRole = AdminRole;
  constructor(private router:Router, private sessionUtil:SessionUtilService) {
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  checkRole() {
    return this.sessionUtil.getLoginData().role == AdminRole.MASTER;
  }
}
