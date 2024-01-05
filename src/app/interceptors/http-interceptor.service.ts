import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {SessionUtilService} from "../util/session-util.service";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private sessionUtil: SessionUtilService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("inside interceptor")
    if (!req.url.includes('login')) {
      const modifiedRequest = req.clone({
        setHeaders: {
          'authToken': this.sessionUtil.getLoginData().token,
          // Add more headers or modify existing ones
          ...req.headers.keys()
            .reduce((headers, header) => ({...headers, [header]: req.headers.getAll(header)}), {})
        },
      });
      return next.handle(modifiedRequest).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // Log the incoming response
              console.log('Incoming Response:', event);
              if(event.body.responseCode==300){
                this.sessionUtil.logout();
              }
            }
          },
          (error) => {
            // Log any errors that occur during the request
            console.error('Error:', error);
          }
        )
      );
    } else {
      return next.handle(req);
    }
  }
}
