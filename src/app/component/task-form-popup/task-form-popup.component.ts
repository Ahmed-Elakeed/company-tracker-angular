import {Component, Inject, OnInit} from '@angular/core';
import {TaskDTO} from "../../dto/TaskDTO";
import {TaskStatus} from "../../enums/TaskStatus";
import {EmployeeDTO} from "../../dto/EmployeeDTO";
import {ProjectDTO} from "../../dto/ProjectDTO";
import {ProjectService} from "../../service/project.service";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskService} from "../../service/task.service";

@Component({
  selector: 'app-task-form-popup',
  templateUrl: './task-form-popup.component.html',
  styleUrls: ['./task-form-popup.component.css']
})
export class TaskFormPopupComponent implements OnInit {
  invalidCredentials = false;
  taskSaveDTO: TaskDTO = new TaskDTO();
  employeeList: EmployeeDTO[] = [];
  projectList: ProjectDTO[] = [];
  isProjectSelected=false;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<TaskFormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TaskDTO
  ) {
    if (this.data) {
      this.data.endDate = this.datePipe.transform(this.data.endDate, 'yyyy-MM-dd');
      this.data.startDate = this.datePipe.transform(this.data.startDate, 'yyyy-MM-dd');
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.taskSaveDTO = this.data;
    }
    this.projectService.fetchAllProjects().subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.projectList = response.data;
        }
      }
    )
    if(this.taskSaveDTO.employeeId){
      this.onProjectSelect();
    }
  }

  saveOrUpdateTask() {
    this.taskService.saveOrUpdateTask(this.taskSaveDTO).subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.invalidCredentials = false;
          console.log("Task submitted successfully")
          this.dialogRef.close(true);
        } else {
          this.invalidCredentials = true;
          console.log("Failed to submit task")
        }
      }
    )
  }

  allTaskStatus() {
    return Object.values(TaskStatus).filter(status => typeof status !== 'number')
  }

  onProjectSelect() {
    this.employeeList=[];
    this.isProjectSelected=false;
    this.projectService.fetchAllEmployeesOfTheSameDepartment(this.taskSaveDTO.projectId).subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.employeeList = response.data;
          this.isProjectSelected=true
        }
      }
    )
  }
}
