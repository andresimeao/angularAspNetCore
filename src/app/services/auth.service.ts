import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private url = "https://localhost:5001/"
  private httpOptions = {
  headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  //config handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('ocorreu um erro no evento:', error.error.message);
    } else {
      if(error.status == 400 && error.error.success == false){
        alert(error.error.error);
      }
    }
    return throwError('Ocorreu um erro na solictação.');
  };

  public login(uri:string, user:any):Observable<any>{
    return this.http.post<any>(this.url + uri, user, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
