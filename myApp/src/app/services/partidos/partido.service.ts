import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Partido } from '../../models/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  ApiURL: String = environment.ApiUrl;
  constructor(private http: HttpClient) { }

  getPartidos(): Observable<any[]> {
    return this.http.get<any[]>(this.ApiURL + '/partidos').pipe(
      catchError((error) => {
        console.error('Error al cargar partidos:', error);
        return throwError(error);
      })
    );
  }

  getPartido(idPartido: number): Observable<any> {
    return this.http.get<any[]>(this.ApiURL + 'partido/' + `${idPartido}`).pipe(
      catchError((error) => {
        console.error('Error al cargar partido:', error);
        return throwError(error);
      })
    );
  }

  eliminarPartido(idPartido: number): Observable<any> {
    return this.http.delete<any>(this.ApiURL + 'partido/' + `${idPartido}`).pipe(
      catchError(error => {
        console.error('Error al eliminar partido:', error);
        return throwError(error);
      })
    );
  }

  createPartido(partidoData: any): Observable<any> {
    return this.http.post<any>(`${this.ApiURL}partidoC/`, partidoData);
  }

  updatePartido(partidoData: any): Observable<any> {
    return this.http.put<any>(`${this.ApiURL}partidoU/`, partidoData);
  }

}
