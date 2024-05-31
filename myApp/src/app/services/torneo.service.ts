import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  baseApiUrl: String  = environment.baseApiUrl; 

  constructor(private http: HttpClient) { }

  getTorneos(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/api/torneosG');
  }
  deleteTorneos(id:number): Observable<any> {
    return this.http.delete<any>(this.baseApiUrl + '/api/torneoD/'+id);
  }
  getTorneo(id:number): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/api/torneoG/'+id);
  }

  updateTorneo(torneoData: any): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/api/torneoU`, torneoData);
  }
  
  createTorneo(torneoData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/torneoC`, torneoData);
  }
  
  
  
}
