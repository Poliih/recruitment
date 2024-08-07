import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:8081/api/jobs';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getJob(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createJob(job: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, job);
  }
}
