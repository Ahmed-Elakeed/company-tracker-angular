import { Component } from '@angular/core';
import {DepartmentDTO} from "../../dto/DepartmentDTO";
import {DepartmentService} from "../../service/department.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-department-form-popup',
  templateUrl: './department-form-popup.component.html',
  styleUrls: ['./department-form-popup.component.css']
})
export class DepartmentFormPopupComponent {
  departmentSaveDTO: DepartmentDTO = new DepartmentDTO();
  invalidCredentials=false;

  constructor(private departmentService:DepartmentService, private dialogRef: MatDialogRef<DepartmentFormPopupComponent>) {
  }
  saveDepartment() {
    this.departmentService.saveDepartment(this.departmentSaveDTO).subscribe(
      (response)=>{
          if(response.responseCode==200){
            this.invalidCredentials=false;
            console.log("Department saved successfully")
            this.dialogRef.close(true);
          }else{
            this.invalidCredentials=true;
            console.log("Failed to save department")
          }
      }
    )
  }
}
