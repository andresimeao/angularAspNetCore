import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


  private user: string = '';
  private password: string = '';
  private authorization: string = '';

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.user = localStorage.getItem('username');
    this.password = localStorage.getItem('password');
    this.authorization = 'Basic ' + btoa(this.user + ':' + this.password);

    //basic authentication
    if (!request.headers.has('Authorization')) {
      request = request.clone({ headers: request.headers.set('Authorization', this.authorization) });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        //this.hideLoading();
        data = {
          name: error.name,
          message: error.message,
          status: error.status
        };
        alert(data['message']);
        return throwError(error);
      }));
  }
}
