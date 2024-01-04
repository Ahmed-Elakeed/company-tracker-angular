import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiGenericResponse} from "../dto/ApiGenericResponse";
import {LoginDTO} from "../dto/LoginDTO";
import {AdminDTO} from "../dto/AdminDTO";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private ADMIN_URL = environment.BASE_URL + 'admins'

  constructor(private http: HttpClient) {
  }

  public adminLogin(loginDTO: LoginDTO): Observable<ApiGenericResponse> {
    return this.http.post<ApiGenericResponse>(this.ADMIN_URL + '/login', loginDTO);
  }

  public fetchAllAdmins(): Observable<ApiGenericResponse> {
    return this.http.get<ApiGenericResponse>(this.ADMIN_URL);
  }

  public deleteAdmin(id: number): Observable<ApiGenericResponse> {
    return this.http.delete<ApiGenericResponse>(this.ADMIN_URL + "/" + id);
  }

  public saveOrUpdateAdmin(adminDTO: AdminDTO): Observable<ApiGenericResponse> {
    return this.http.post<ApiGenericResponse>(this.ADMIN_URL, adminDTO);
  }
}
