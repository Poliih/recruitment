import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './job.model';
import { Application } from './application.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8081/api/jobs';

  constructor(private http: HttpClient) {}

  applyForJob(jobId: number, applicant: { applicantName: string; applicantEmail: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${jobId}/apply`, applicant);
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  addJob(job: { title: string; description: string }): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  updateJob(id: number, job: Partial<Job>): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getApplicationsForJob(jobId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/${jobId}/applications`);
  }
}
