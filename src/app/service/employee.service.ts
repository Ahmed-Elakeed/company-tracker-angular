import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ApiGenericResponse} from "../dto/ApiGenericResponse";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private EMPLOYEE_URL= environment.BASE_URL + 'employees';
  constructor(private http:HttpClient) { }

  public fetchAllEmployees():Observable<ApiGenericResponse>{
    return this.http.get<ApiGenericResponse>(this.EMPLOYEE_URL);
  }
}
