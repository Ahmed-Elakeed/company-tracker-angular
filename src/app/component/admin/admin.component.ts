import {Component, OnInit} from '@angular/core';
import {AdminDTO} from "../../dto/AdminDTO";
import {AdminService} from "../../service/admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminDTOs: AdminDTO[] = [];

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.getAllAdmins();
  }

  private getAllAdmins() {
    this.adminService.fetchAllAdmins().subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.adminDTOs = response.data
        }
      }
    )
  }

  // todo -> implement save and update admin with constraints if master or slave (may add update info button in the navbar for every admin and all admins tab for delete or update others for master admins only)
  openFormDialog(adminDTO?: AdminDTO) {

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
