import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {SessionUtilService} from "../util/session-util.service";


@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionUtil:SessionUtilService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.sessionUtil.getLoginData()?.token!=null && this.sessionUtil.getLoginData()?.token!="") {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
