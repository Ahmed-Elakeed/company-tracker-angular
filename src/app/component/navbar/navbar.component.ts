import { Component } from '@angular/core';
import {SessionUtilService} from "../../util/session-util.service";
import {AdminRole} from "../../enums/AdminRole";
import {AdminFormPopupComponent} from "../admin-form-popup/admin-form-popup.component";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  protected readonly AdminRole = AdminRole;
  constructor(
    private dialog:MatDialog,
    private sessionUtil:SessionUtilService
  ) {
  }
  logout() {
    this.sessionUtil.logout();
  }

  checkRole() {
    return this.sessionUtil.getLoginData().role == AdminRole.MASTER;
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(AdminFormPopupComponent, {
      width: '400px',
      height: '500px',
      data: this.sessionUtil.getLoginData()
    });

    // Optional: Handle dialog close or submit events
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Personal data updated")
      }
    });
  }
}
