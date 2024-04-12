import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  geUser(id:number):Observable<User>{
    return this.http.get<User>(environment.urlApi+'/user/'+id).pipe(
      catchError(this.hadleError)
    )
  }
  private hadleError(error: HttpErrorResponse){
    if(error.status===0){
      console.error("Ha habido un error", error.error);
    }else{
      console.error("Código de estado del Backend: ", error.error);
    }
    return throwError(()=> new Error("Algo falló, por favor intentelo de nuevo"));
  
  }
}
