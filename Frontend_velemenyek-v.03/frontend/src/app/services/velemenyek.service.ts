import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Velemeny {
  id?: number;     
  opinion: string;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class VelemenyService {
  private apiUrl = 'http://localhost:3000/velemenyek';

  constructor(private http: HttpClient) {}

  getVelemenyek(): Observable<Velemeny[]> {
    return this.http.get<Velemeny[]>(this.apiUrl);
  }

  addVelemeny(velemeny: Velemeny): Observable<Velemeny> {
    return this.http.post<Velemeny>(this.apiUrl, velemeny);
  }

  deleteVelemeny(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateVelemeny(id: number, opinion: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, { opinion });
  }
}