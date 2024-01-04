import {Component} from '@angular/core';
import {SessionUtilService} from "./util/session-util.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'company-tracker-ui';

  constructor(private sessionUtil: SessionUtilService) {
  }

  checkAuthentication() {
    const loginData = this.sessionUtil.getLoginData();
    return loginData?.token != null && loginData?.token != '';
  }
}
