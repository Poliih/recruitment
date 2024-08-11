import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-jobs',
  templateUrl: './edit-jobs.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./edit-jobs.component.css']
})
export class EditJobsComponent implements OnInit {
  jobs: any[] = [];
  newJobTitle: string = '';
  newJobDescription: string = '';
  applications: any[] = [];
  selectedJobId: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.http.get<any[]>('http://localhost:8081/api/jobs')
      .subscribe({
        next: (data) => {
          this.jobs = data;
        },
        error: (error) => {
          console.error('Error fetching jobs:', error);
        }
      });
  }

  addJob(): void {
    if (this.newJobTitle && this.newJobDescription) {
      this.http.post('http://localhost:8081/api/jobs', {
        title: this.newJobTitle,
        description: this.newJobDescription
      })
        .subscribe({
          next: () => {
            this.fetchJobs(); // Refresh the job list
            this.newJobTitle = '';
            this.newJobDescription = '';
          },
          error: (error) => {
            console.error('Error adding job:', error);
          }
        });
    }
  }

  editJob(id: number): void {
    const newTitle = prompt('Enter new title:');
    const newDescription = prompt('Enter new description:');

    if (newTitle && newDescription) {
      this.http.put(`http://localhost:8081/api/jobs/${id}`, {
        title: newTitle,
        description: newDescription
      })
        .subscribe({
          next: () => {
            this.fetchJobs(); // Refresh the job list
          },
          error: (error) => {
            console.error('Error updating job:', error);
          }
        });
    }
  }

  deleteJob(id: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.http.delete(`http://localhost:8081/api/jobs/${id}`)
        .subscribe({
          next: () => {
            this.fetchJobs(); // Refresh the job list
          },
          error: (error) => {
            console.error('Error deleting job:', error);
          }
        });
    }
  }

  viewApplications(jobId: number): void {
    this.http.get<any[]>(`http://localhost:8081/api/jobs/${jobId}/applications`)
      .subscribe({
        next: (data) => {
          this.applications = data;
          this.selectedJobId = jobId;
        },
        error: (error) => {
          console.error('Error fetching applications:', error);
        }
      });
  }

  hideApplications(): void {
    this.applications = [];
    this.selectedJobId = null;
  }
}
