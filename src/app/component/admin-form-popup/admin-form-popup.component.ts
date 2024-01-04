import {Component, Inject, OnInit} from '@angular/core';
import {AdminDTO} from "../../dto/AdminDTO";
import {AdminRole} from "../../enums/AdminRole";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminService} from "../../service/admin.service";
import {SessionUtilService} from "../../util/session-util.service";

@Component({
  selector: 'app-admin-form-popup',
  templateUrl: './admin-form-popup.component.html',
  styleUrls: ['./admin-form-popup.component.css']
})
export class AdminFormPopupComponent implements OnInit {
  invalidCredentials = false;
  adminSaveDTO: AdminDTO = new AdminDTO();
  confirmPassword = '';

  constructor(
    private adminService: AdminService,
    private sessionUtil:SessionUtilService,
    private dialogRef: MatDialogRef<AdminFormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }


  ngOnInit(): void {
    if (this.data) {
      this.adminSaveDTO.id=this.data.id;
      this.adminSaveDTO.name = this.data.name;
      this.adminSaveDTO.email = this.data.email;
      // @ts-ignore
      this.adminSaveDTO.role = AdminRole[this.data.role];
    }
  }

  saveOrUpdateAdmin() {
    if (this.adminSaveDTO.password !== this.confirmPassword) {
      this.invalidCredentials = true;
    } else {
      this.adminService.saveOrUpdateAdmin(this.adminSaveDTO).subscribe(
        (response) => {
          if (response.responseCode == 200) {
            this.invalidCredentials = false;
            console.log("Admin submitted successfully")
            this.dialogRef.close(true);
            if(this.data){
              this.sessionUtil.logout();
            }
          } else {
            this.invalidCredentials = true;
            console.log("Failed to submit admin")
          }
        }
      )
    }
  }

  allAdminRoles() {
    return Object.values(AdminRole).filter(status => typeof status !== 'number')
  }

  isMaster() {
    return this.sessionUtil.getLoginData().role===AdminRole.MASTER;
  }
}
