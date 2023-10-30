import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployeeComponent} from "./component/employee/employee.component";
import {DepartmentComponent} from "./component/department/department.component";


const routes:Routes=[
  {
    path: 'employees',
    component: EmployeeComponent
  },
  {
    path: 'departments',
    component: DepartmentComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
