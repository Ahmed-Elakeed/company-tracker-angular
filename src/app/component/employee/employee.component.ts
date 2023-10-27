import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  constructor(private employeeService:EmployeeService) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public getAllEmployees(){
    this.employeeService.fetchAllEmployees().subscribe(
      (data)=>{
        console.log(data);
      }
    )
  }



}
