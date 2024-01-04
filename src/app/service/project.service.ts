import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiGenericResponse} from "../dto/ApiGenericResponse";
import {ProjectDTO} from "../dto/ProjectDTO";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private PROJECT_URL = environment.BASE_URL + 'projects';

  constructor(private http: HttpClient) {
  }

  public fetchAllProjects(): Observable<ApiGenericResponse> {
    return this.http.get<ApiGenericResponse>(this.PROJECT_URL);
  }

  public deleteProject(id: number): Observable<ApiGenericResponse> {
    return this.http.delete<ApiGenericResponse>(this.PROJECT_URL + "/" + id);
  }

  public saveOrUpdateProject(projectDTO: ProjectDTO): Observable<ApiGenericResponse> {
    return this.http.post<ApiGenericResponse>(this.PROJECT_URL, projectDTO);
  }

  public fetchAllEmployeesOfTheSameDepartment(projectId: number): Observable<ApiGenericResponse> {
    return this.http.get<ApiGenericResponse>(this.PROJECT_URL + "/" + projectId + "/available-employees")
  }
}
