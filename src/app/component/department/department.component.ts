import {Component} from '@angular/core';
import {DepartmentService} from "../../service/department.service";
import {DepartmentDTO} from "../../dto/DepartmentDTO";
import {MatDialog} from "@angular/material/dialog";
import {DepartmentFormPopupComponent} from "../department-form-popup/department-form-popup.component";
import {CustomTablePopupViewComponent} from "../custom-table-popup-view/custom-table-popup-view.component";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  public departmentsDTOs: DepartmentDTO[] = [];

  constructor(private departmentService: DepartmentService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  public getAllDepartments() {
    this.departmentService.fetchAllDepartments().subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.departmentsDTOs = response.data;
        }
      }
    )
  }

  public deleteDepartment(id: number) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.departmentService.deleteDepartment(id).subscribe(
        (response) => {
          if (response.responseCode == 200) {
            this.departmentsDTOs = this.departmentsDTOs.filter(departmentDTO => {
              return departmentDTO.id != id
            })
          }
        }
      )
    }
  }

  openFormDialog() {
    const dialogRef = this.dialog.open(DepartmentFormPopupComponent, {
      width: '400px',
      height: '250px'
    });

    // Optional: Handle dialog close or submit events
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllDepartments()
      }
    });
  }

  showDepartmentEmployees(departmentId: number) {
    this.departmentService.fetchDepartmentEmployees(departmentId).subscribe(
      (response) => {
        if (response.responseCode == 200) {
          const dialogRef = this.dialog.open(CustomTablePopupViewComponent, {
            width: '500px',
            height: '500px',
            data: {
              tableHeaders: ["#", "Name", "Email"],
              tableData: response.data.map((obj: any) => {
                const newObj = {...obj}; // Create a shallow copy of the object
                delete newObj["departmentName"];
                delete newObj["departmentId"];// Remove the specified property
                return newObj;
              })
            }
          })

          dialogRef.afterClosed().subscribe(
            () => {
              console.log("Employees popup table closed")
            }
          )
        } else {
          console.log("Something wrong... please contact the administrator")
        }
      }
    )
  }

  showDepartmentProjects(departmentId: number) {
    this.departmentService.fetchDepartmentProjects(departmentId).subscribe(
      (response) => {
        if (response.responseCode == 200) {
          const dialogRef = this.dialog.open(CustomTablePopupViewComponent, {
            width: '1000px',
            height: '500px',
            data: {
              tableHeaders: ["#", "Name", "Start Date", "End Date", "Description", "Status"],
              tableData: response.data.map((obj: any) => {
                const newObj = {...obj};
                newObj.startDate = new Date(newObj.startDate).toDateString()
                newObj.endDate = new Date(newObj.endDate).toDateString()
                // Create a shallow copy of the object
                delete newObj["departmentName"];
                delete newObj["departmentId"];// Remove the specified property
                return newObj;
              })
            }
          })

          dialogRef.afterClosed().subscribe(
            () => {
              console.log("Projects popup table closed")
            }
          )
        } else {
          console.log("Something wrong... please contact the administrator")
        }
      }
    )
  }
}
