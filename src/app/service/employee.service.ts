import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ApiGenericResponse} from "../dto/ApiGenericResponse";
import {EmployeeDTO} from "../dto/EmployeeDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private EMPLOYEE_URL = environment.BASE_URL + 'employees';

  constructor(private http: HttpClient) {
  }

  public fetchAllEmployees(): Observable<ApiGenericResponse> {
    return this.http.get<ApiGenericResponse>(this.EMPLOYEE_URL);
  }

  public deleteEmployee(id: number): Observable<ApiGenericResponse> {
    return this.http.delete<ApiGenericResponse>(this.EMPLOYEE_URL + "/" + id);
  }

  public saveOrUpdateEmployee(employeeSaveDTO: EmployeeDTO): Observable<ApiGenericResponse> {
    return this.http.post<ApiGenericResponse>(this.EMPLOYEE_URL, employeeSaveDTO);
  }
}
