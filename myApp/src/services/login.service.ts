import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseApiUrl: String = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  loginUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/login', usuario).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }
}
