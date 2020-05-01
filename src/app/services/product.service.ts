import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "https://localhost:5001/"

  constructor(private http: HttpClient) {}

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

  //buscar todos
  public getAll():Observable<any> {
    return this.http.get<any>(this.url + 'api/Products').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  //obter imagem
  public getImegem(id:any):Observable<any>{
    return this.http.get<any>(this.url + "imagem/" + id ).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //cadastrar produto
  public add(form:any):Observable<any>{
    return this.http.post<any>(this.url + "api/Products", form).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //buscar produto pelo Id
  public getById(id:any):Observable<any>{
    return this.http.get<any>(this.url + "api/Products/" + id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //update produto
  public update(id:any, form: any):Observable<any>{
    return this.http.put<any>(this.url+ "api/Products/"+ id, form).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  public delete(id:any):Observable<any>{
    return this.http.delete<any>(this.url + "api/Products/" + id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
}
