import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interview } from '../models/interview'; 
import { DetailedInterview } from '../models/detailed-interview';
@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private apiUrl = 'https://localhost:7215/api/interviews';

  constructor(private http: HttpClient) {}

  getInterviews(): Observable<Interview[]> {
    return this.http.get<Interview[]>(this.apiUrl);
  }

  getInterviewById(id: number): Observable<DetailedInterview> {
    return this.http.get<DetailedInterview>(`${this.apiUrl}/${id}`);
  } 
}
