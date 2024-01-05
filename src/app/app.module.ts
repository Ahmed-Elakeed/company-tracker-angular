import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {EmployeeComponent} from './component/employee/employee.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DepartmentComponent} from './component/department/department.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from './app-routing.module';
import {ProjectComponent} from './component/project/project.component';
import {TaskComponent} from './component/task/task.component';
import {LoginComponent} from './component/login/login.component';
import {FormsModule} from "@angular/forms";
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {DepartmentFormPopupComponent} from './component/department-form-popup/department-form-popup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import { EmployeeFormPopupComponent } from './component/employee-form-popup/employee-form-popup.component';
import { CustomTablePopupViewComponent } from './component/custom-table-popup-view/custom-table-popup-view.component';
import { ProjectFormPopupComponent } from './component/project-form-popup/project-form-popup.component';
import {DatePipe} from "@angular/common";
import { TaskFormPopupComponent } from './component/task-form-popup/task-form-popup.component';
import { AdminComponent } from './component/admin/admin.component';
import { AdminFormPopupComponent } from './component/admin-form-popup/admin-form-popup.component';
import {HttpInterceptorService} from "./interceptors/http-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DepartmentComponent,
    NavbarComponent,
    ProjectComponent,
    TaskComponent,
    LoginComponent,
    PageNotFoundComponent,
    DepartmentFormPopupComponent,
    EmployeeFormPopupComponent,
    CustomTablePopupViewComponent,
    ProjectFormPopupComponent,
    TaskFormPopupComponent,
    AdminComponent,
    AdminFormPopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
