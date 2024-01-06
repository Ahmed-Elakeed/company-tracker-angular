import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {TaskDTO} from "../../dto/TaskDTO";
import {TaskFormPopupComponent} from "../task-form-popup/task-form-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {TasksReportFormComponent} from "../tasks-report-form/tasks-report-form.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public tasksDTOs: TaskDTO[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  public getAllTasks() {
    this.taskService.fetchAllTasks().subscribe(
      (response: any) => {
        this.tasksDTOs = response.data;
      }
    )
  }

  openFormDialog(taskDTO?: TaskDTO) {
    const dialogRef = this.dialog.open(TaskFormPopupComponent, {
      width: '455px',
      height: '700PX',
      data: taskDTO ? taskDTO : null,
    });

    // Optional: Handle dialog close or submit events
    dialogRef.afterClosed().subscribe((result) => {
      if (result || taskDTO) {
        this.getAllTasks();
      }
    });
  }

  deleteTask(id: number) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.taskService.deleteTask(id).subscribe(
        (response) => {
          if (response.responseCode == 200) {
            this.tasksDTOs = this.tasksDTOs.filter(taskDTO => {
              return taskDTO.id != id
            })
          }
        }
      )
    }
  }

  openReportFormDialog() {
    const dialogRef = this.dialog.open(TasksReportFormComponent, {
      width: '450px',
      height: '220px'
    });

    // Optional: Handle dialog close or submit events
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Tasks report sent successfully");
      }
    });
  }
}
