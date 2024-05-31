import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  ApiURL: String = environment.ApiUrl;
  constructor(private http: HttpClient) {}

  getEquipos(): Observable<any[]> {
    return this.http.get<any[]>(this.ApiURL + '/equiposG').pipe(
      catchError((error) => {
        console.error('Error al cargar equipos:', error);
        return throwError(error);
      })
    );
  }

  eliminarEquipo(idEquipo: number): Observable<any> {
    return this.http.delete<any>(`${this.ApiURL}equipoD/${idEquipo}`).pipe(
      catchError(error => {
        console.error('Error al eliminar equipo:', error);
        return throwError(error);
      })
    );
  }
}
