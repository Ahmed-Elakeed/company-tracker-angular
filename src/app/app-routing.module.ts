import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployeeComponent} from "./component/employee/employee.component";
import {DepartmentComponent} from "./component/department/department.component";
import {ProjectComponent} from "./component/project/project.component";
import {TaskComponent} from "./component/task/task.component";
import {LoginComponent} from "./component/login/login.component";
import {AuthGuard} from "./security/auth-guard.guard";
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import {AdminComponent} from "./component/admin/admin.component";


const routes:Routes=[
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'employees',
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'departments',
    component: DepartmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: ProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admins',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    component:PageNotFoundComponent,
    canActivate: [AuthGuard]
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
