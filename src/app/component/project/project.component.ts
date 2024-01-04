import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../service/project.service";
import {ProjectDTO} from "../../dto/ProjectDTO";
import {ProjectFormPopupComponent} from "../project-form-popup/project-form-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{
  public projectsDTOs: ProjectDTO[] = [];

  constructor(private projectService: ProjectService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  public getAllProjects() {
    this.projectService.fetchAllProjects().subscribe(
      (response: any) => {
        this.projectsDTOs = response.data;
      }
    )
  }

  openFormDialog(projectDTO?: ProjectDTO) {
    const dialogRef = this.dialog.open(ProjectFormPopupComponent, {
      width: '455px',
      height: '600px',
      data: projectDTO ? projectDTO : null,
    });

    // Optional: Handle dialog close or submit events
    dialogRef.afterClosed().subscribe((result) => {
      if (result || projectDTO) {
        this.getAllProjects();
      }
    });
  }

  deleteProject(id: number) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.projectService.deleteProject(id).subscribe(
        (response) => {
          if (response.responseCode == 200) {
            this.projectsDTOs = this.projectsDTOs.filter(projectDTO => {
              return projectDTO.id != id
            })
          }
        }
      )
    }
  }
}
