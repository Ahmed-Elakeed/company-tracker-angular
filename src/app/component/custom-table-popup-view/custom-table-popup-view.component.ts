import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-custom-table-popup-view',
  templateUrl: './custom-table-popup-view.component.html',
  styleUrls: ['./custom-table-popup-view.component.css']
})
export class CustomTablePopupViewComponent {

  protected readonly Object = Object;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
