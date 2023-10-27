import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './component/employee/employee.component';
import {HttpClientModule} from "@angular/common/http";
import { DepartmentComponent } from './component/department/department.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DepartmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
