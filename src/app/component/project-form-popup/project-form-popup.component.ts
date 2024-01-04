import {Component, Inject, OnInit} from '@angular/core';
import {ProjectDTO} from "../../dto/ProjectDTO";
import {ProjectStatus} from "../../enums/ProjectStatus";
import {DepartmentService} from "../../service/department.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DepartmentDTO} from "../../dto/DepartmentDTO";
import {ProjectService} from "../../service/project.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-project-form-popup',
  templateUrl: './project-form-popup.component.html',
  styleUrls: ['./project-form-popup.component.css']
})
export class ProjectFormPopupComponent implements OnInit {

  invalidCredentials = false;
  projectSaveDTO: ProjectDTO = new ProjectDTO();
  departmentList: DepartmentDTO[] = [];

  constructor(
    private projectService: ProjectService,
    private departmentService: DepartmentService,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<ProjectFormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ProjectDTO
  ) {
    if (this.data) {
      this.data.endDate = this.datePipe.transform(this.data.endDate, 'yyyy-MM-dd');
      this.data.startDate = this.datePipe.transform(this.data.startDate, 'yyyy-MM-dd');
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.projectSaveDTO = this.data;
    }
    this.departmentService.fetchAllDepartments().subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.departmentList = response.data;
        }
      }
    )
  }

  saveOrUpdateProject() {
    this.projectService.saveOrUpdateProject(this.projectSaveDTO).subscribe(
      (response) => {
        if (response.responseCode == 200) {
          this.invalidCredentials = false;
          console.log("Project submitted successfully")
          this.dialogRef.close(true);
        } else {
          this.invalidCredentials = true;
          console.log("Failed to submit project")
        }
      }
    )
  }

  allProjectStatus() {
    return Object.values(ProjectStatus).filter(status => typeof status !== 'number')
  }
}
