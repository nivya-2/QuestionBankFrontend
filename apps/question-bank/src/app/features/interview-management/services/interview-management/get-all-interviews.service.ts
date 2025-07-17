import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interview } from '../../models/interview'; 
@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private privateapiBasePath= 'https://localhost:7215/api';

  constructor(private http: HttpClient) {}

  getInterviews(): Observable<Interview[]> {
    return this.http.get<Interview[]>(`${this.privateapiBasePath}/interviews`);
  }
}
