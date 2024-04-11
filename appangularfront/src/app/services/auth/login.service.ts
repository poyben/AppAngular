import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0,email:""});

  constructor(private http: HttpClient) { }
  
  login(credentials:LoginRequest):Observable<User>{
    return this.http.get<User>("././assets/data.json").pipe(
      tap(userData =>{
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status ===0){
      console.error("Ha habido un error", error.error);
    }else{
      console.error("Código de estado del Backend: ", error.error);
    }
    return throwError(()=> new Error("Algo falló, por favor intentelo de nuevo"));
  

  }

  get UserData():Observable<User>{
    return this.currentUserData.asObservable();
  }

}
