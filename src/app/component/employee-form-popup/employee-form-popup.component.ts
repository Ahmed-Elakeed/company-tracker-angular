import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeDTO} from "../../dto/EmployeeDTO";
import {DepartmentService} from "../../service/department.service";
import {DepartmentDTO} from "../../dto/DepartmentDTO";
import {EmployeeService} from "../../service/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-employee-form-popup',
  templateUrl: './employee-form-popup.component.html',
  styleUrls: ['./employee-form-popup.component.css']
})
export class EmployeeFormPopupComponent implements OnInit {
  invalidCredentials = false;
  employeeSaveDTO: EmployeeDTO = new EmployeeDTO();
  departmentList: DepartmentDTO[] = [];

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeFormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: EmployeeDTO
  ) {
  }

  ngOnInit(): void {
    if(this.data){
      this.employeeSaveDTO=this.data;
      console.log(this.employeeSaveDTO)
    }
    this.departmentService.fetchAllDepartments().subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.departmentList = response.data;
        }
      }
    )
  }

  saveOrUpdateEmployee() {
    this.employeeService.saveOrUpdateEmployee(this.employeeSaveDTO).subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.invalidCredentials = false;
          console.log("Employee submitted successfully")
          this.dialogRef.close(true);
        } else {
          this.invalidCredentials = true;
          console.log("Failed to submit employee")
        }
      }
    )
  }
}
