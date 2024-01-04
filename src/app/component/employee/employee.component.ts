import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";
import {EmployeeDTO} from "../../dto/EmployeeDTO";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeFormPopupComponent} from "../employee-form-popup/employee-form-popup.component";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employeesDTOs: EmployeeDTO[] = [];

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public getAllEmployees() {
    this.employeeService.fetchAllEmployees().subscribe(
      (response) => {
        this.employeesDTOs = response.data;
      }
    )
  }


  public deleteEmployee(id: number) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        (response) => {
          if (response.responseCode == 200) {
            this.employeesDTOs = this.employeesDTOs.filter(employeeDTO => {
              return employeeDTO.id != id
            })
          }
        }
      )
    }
  }

  openFormDialog(employeeDTO?:EmployeeDTO) {
    const dialogRef = this.dialog.open(EmployeeFormPopupComponent, {
      width: '455px',
      height: '350px',
      data: employeeDTO ? employeeDTO:null,
    });

    // Optional: Handle dialog close or submit events
    dialogRef.afterClosed().subscribe((result) => {
      if (result || employeeDTO) {
        this.getAllEmployees();
      }
    });
  }
}
