import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfume } from '../perfumes/perfumes.model';

@Injectable({
  providedIn: 'root'
})
export class PerfumeService {
  private apiUrl = 'http://localhost:3000/perfumes'; 

  constructor(private http: HttpClient) {}

  getPerfumes(): Observable<Perfume[]> {
    return this.http.get<Perfume[]>(this.apiUrl);
  }
}