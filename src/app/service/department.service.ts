import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiGenericResponse} from "../dto/ApiGenericResponse";
import {environment} from "../../environments/environment";
import {DepartmentDTO} from "../dto/DepartmentDTO";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private DEPARTMENT_URL = environment.BASE_URL + 'departments'

  constructor(private http: HttpClient) {
  }

  public fetchAllDepartments(): Observable<ApiGenericResponse> {
    return this.http.get<ApiGenericResponse>(this.DEPARTMENT_URL);
  }

  public deleteDepartment(id: number): Observable<ApiGenericResponse> {
    return this.http.delete<ApiGenericResponse>(this.DEPARTMENT_URL + "/" + id);
  }

  public saveDepartment(departmentSaveDTO: DepartmentDTO): Observable<ApiGenericResponse> {
    return this.http.post<ApiGenericResponse>(this.DEPARTMENT_URL, departmentSaveDTO);
  }

  public fetchDepartmentEmployees(departmentId: number): Observable<ApiGenericResponse> {
    return this.http.get<ApiGenericResponse>(this.DEPARTMENT_URL + "/" + departmentId + "/employees");
  }

  public fetchDepartmentProjects(departmentId: number): Observable<ApiGenericResponse> {
    return this.http.get<ApiGenericResponse>(this.DEPARTMENT_URL + "/" + departmentId + "/projects");
  }
}
