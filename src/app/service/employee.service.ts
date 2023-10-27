import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {EmployeeDTO} from "../dto/EmployeeDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private EMPLOYEE_URL= environment.BASE_URL + 'employees'
  constructor(private http:HttpClient) { }

  public fetchAllEmployees():Observable<EmployeeDTO[]>{
    return this.http.get<EmployeeDTO[]>(this.EMPLOYEE_URL);
  }
}
