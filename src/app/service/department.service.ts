import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiGenericResopnse} from "../dto/ApiGenericResopnse";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private DEPARTMENT_URL= environment.BASE_URL + 'departments'
  constructor(private http:HttpClient) { }

  public fetchAllDepartments():Observable<ApiGenericResopnse>{
    return this.http.get<ApiGenericResopnse>(this.DEPARTMENT_URL);
  }
}
