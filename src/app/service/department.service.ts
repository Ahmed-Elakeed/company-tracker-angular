import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiGenericResponse} from "../dto/ApiGenericResponse";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private DEPARTMENT_URL= environment.BASE_URL + 'departments'
  constructor(private http:HttpClient) { }

  public fetchAllDepartments():Observable<ApiGenericResponse>{
    return this.http.get<ApiGenericResponse>(this.DEPARTMENT_URL);
  }
}
