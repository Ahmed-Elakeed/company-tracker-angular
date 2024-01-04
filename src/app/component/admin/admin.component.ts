import {Component, OnInit} from '@angular/core';
import {AdminDTO} from "../../dto/AdminDTO";
import {AdminService} from "../../service/admin.service";
import {SessionUtilService} from "../../util/session-util.service";
import {AdminFormPopupComponent} from "../admin-form-popup/admin-form-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminDTOs: AdminDTO[] = [];

  constructor(
    private dialog:MatDialog,
    private adminService: AdminService,
    private sessionUtil:SessionUtilService
  ) {
  }

  ngOnInit(): void {
    this.getAllAdmins();
  }

  private getAllAdmins() {
    this.adminService.fetchAllAdmins().subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.adminDTOs = response.data
          this.adminDTOs = this.adminDTOs.filter(adminDTO => {
            return adminDTO.id != this.sessionUtil.getLoginData().id
          })
        }
      }
    )
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(AdminFormPopupComponent, {
      width: '400px',
      height: '500px'
    });

    // Optional: Handle dialog close or submit events
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllAdmins()
      }
    });
  }

  deleteAdmin(id: number) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.adminService.deleteAdmin(id).subscribe(
        (response) => {
          if (response.responseCode == 200) {
            this.adminDTOs = this.adminDTOs.filter(adminDTO => {
              return adminDTO.id != id
            })
          }
        }
      )
    }
  }
}
