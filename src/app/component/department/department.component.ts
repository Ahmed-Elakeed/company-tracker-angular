import { Component } from '@angular/core';
import {DepartmentService} from "../../service/department.service";
import {DepartmentDTO} from "../../dto/DepartmentDTO";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  public departmentsDTOs:DepartmentDTO[]=[];
  constructor(private departmentService:DepartmentService) {
  }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  public getAllDepartments(){
    this.departmentService.fetchAllDepartments().subscribe(
      (response)=>{
        console.log(response);
        this.departmentsDTOs=response.data;
      }
    )
  }
}
