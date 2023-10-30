import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";
import {EmployeeDTO} from "../../dto/EmployeeDTO";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  public employeesDTOs:EmployeeDTO[]=[];
  constructor(private employeeService:EmployeeService) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public getAllEmployees(){
    this.employeeService.fetchAllEmployees().subscribe(
      (response)=>{
        console.log(response);
        this.employeesDTOs=response.data;
      }
    )
  }



}
