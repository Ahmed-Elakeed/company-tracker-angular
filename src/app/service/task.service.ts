import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiGenericResponse} from "../dto/ApiGenericResponse";
import {TaskDTO} from "../dto/TaskDTO";
import {TaskStatus} from "../enums/TaskStatus";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private TASK_URL = environment.BASE_URL + 'tasks';

  constructor(private http: HttpClient) {
  }

  public fetchAllTasks(): Observable<ApiGenericResponse> {
    return this.http.get<ApiGenericResponse>(this.TASK_URL);
  }

  public deleteTask(id: number): Observable<ApiGenericResponse> {
    return this.http.delete<ApiGenericResponse>(this.TASK_URL + "/" + id);
  }

  public saveOrUpdateTask(taskDTO: TaskDTO): Observable<ApiGenericResponse> {
    return this.http.post<ApiGenericResponse>(this.TASK_URL, taskDTO);
  }

  public sendTasksReport(status: TaskStatus): Observable<ApiGenericResponse> {
    let params: HttpParams = new HttpParams();
    if (status) {
      params = params.append('taskStatus', status);
    }
    return this.http.get<ApiGenericResponse>(this.TASK_URL + "/report", status ? {params: params} : {});
  }
}
