import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-jobs',
  templateUrl: './edit-jobs.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  styleUrls: ['./edit-jobs.component.css']
})
export class EditJobsComponent implements OnInit {
  jobs: any[] = [];
  newJobTitle: string = '';
  newJobDescription: string = '';
  selectedJobId: number | null = null;
  applicationsMap: { [key: number]: any[] } = {}; // Maps job ID to its applications
  message: string | null = null;
  messageType: 'success' | 'error' | null = null; // Variable to store success or error message

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.http.get<any[]>('http://localhost:8081/api/jobs')
      .subscribe({
        next: (data) => {
          this.jobs = data;
          // Initialize applications mapping for each job
          this.jobs.forEach(job => {
            this.applicationsMap[job.id] = [];
          });
        },
        error: (error) => {
          console.error('Error fetching jobs:', error);
          this.message = 'Error fetching jobs.';
          this.messageType = 'error';
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
            this.message = 'Job added successfully!';
            this.messageType = 'success';
          },
          error: (error) => {
            console.error('Error adding job:', error);
            this.message = 'Error adding job.';
            this.messageType = 'error';
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
            this.message = 'Job updated successfully!';
            this.messageType = 'success';
          },
          error: (error) => {
            console.error('Error updating job:', error);
            this.message = 'Error updating job.';
            this.messageType = 'error';
          }
        });
    }
  }

  deleteJob(id: number): void {
    // Check if there are applications associated with the job
    const applications = this.applicationsMap[id];
    if (applications && applications.length > 0) {
      if (confirm('This job has associated applications. Are you sure you want to delete the job and all associated applications?')) {
        this.proceedToDeleteJob(id);
      }
    } else {
      if (confirm('Are you sure you want to delete this job?')) {
        this.proceedToDeleteJob(id);
      }
    }
  }

  private proceedToDeleteJob(id: number): void {
    this.http.delete(`http://localhost:8081/api/jobs/${id}`)
      .subscribe({
        next: () => {
          this.message = 'Job and associated applications deleted successfully!';
          this.messageType = 'success';
          this.fetchJobs(); // Refresh the job list
        },
        error: (error) => {
          console.error('Error deleting job:', error);
          this.message = 'Error deleting job and applications.';
          this.messageType = 'error';
        }
      });
  }

  viewApplications(jobId: number): void {
    this.http.get<any[]>(`http://localhost:8081/api/jobs/${jobId}/applications`)
      .subscribe({
        next: (data) => {
          this.applicationsMap[jobId] = data;
          this.selectedJobId = jobId;
        },
        error: (error) => {
          console.error('Error fetching applications:', error);
          this.message = 'Error fetching applications.';
          this.messageType = 'error';
        }
      });
  }

  hideApplications(): void {
    this.selectedJobId = null;
  }
}
