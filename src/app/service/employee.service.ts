import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ApiGenericResopnse} from "../dto/ApiGenericResopnse";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private EMPLOYEE_URL= environment.BASE_URL + 'employees';
  constructor(private http:HttpClient) { }

  public fetchAllEmployees():Observable<ApiGenericResopnse>{
    return this.http.get<ApiGenericResopnse>(this.EMPLOYEE_URL);
  }
}
