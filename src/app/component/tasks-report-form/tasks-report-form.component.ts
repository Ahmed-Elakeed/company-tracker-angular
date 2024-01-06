import {Component} from '@angular/core';
import {TaskStatus} from "../../enums/TaskStatus";
import {TaskService} from "../../service/task.service";
import {MatDialogRef} from "@angular/material/dialog";
import {TaskFormPopupComponent} from "../task-form-popup/task-form-popup.component";

@Component({
  selector: 'app-tasks-report-form',
  templateUrl: './tasks-report-form.component.html',
  styleUrls: ['./tasks-report-form.component.css']
})
export class TasksReportFormComponent {
  statusFilter: TaskStatus;
  processStatus = {
    'error': false,
    "responded": false,
    "isSending": false
  };

  constructor(private taskService: TaskService, private dialogRef: MatDialogRef<TaskFormPopupComponent>) {
  }

  sendTasksReport() {
    this.processStatus = {
      'error': false,
      "responded": false,
      "isSending": true
    };
    this.taskService.sendTasksReport(this.statusFilter).subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.processStatus = {
            'error': false,
            "responded": true,
            "isSending": false
          };
          setTimeout(() => {
            this.dialogRef.close(true);
          }, 1500);
        } else {
          this.processStatus = {
            'error': true,
            "responded": true,
            "isSending": false
          };
        }
      }
    )
  }

  allTaskStatus() {
    return Object.values(TaskStatus).filter(status => typeof status !== 'number')
  }
}
