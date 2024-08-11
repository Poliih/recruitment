import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgIf, NgForOf} from '@angular/common';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-apply-form',
  standalone: true,
  imports: [
    NgIf, FormsModule, NgForOf, FormsModule
  ],
  templateUrl: './apply-form.component.html',
  styleUrls: ['./apply-form.component.css']
})
export class ApplyFormComponent implements OnInit {
  jobs: any[] = []; // Array to hold job data
  jobId: number | null = null; // Variable to store the selected job ID
  candidateName: string = ''; // Variable for candidate's name
  candidateEmail: string = ''; // Variable for candidate's email
  message: string | null = null; // Variable for success messages
  error: string | null = null; // Variable for error messages

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.http.get<any[]>('http://localhost:8081/api/jobs')
      .subscribe(
        (data) => {
          this.jobs = data;
        },
        (error) => {
          console.error('Error fetching jobs:', error);
        }
      );
  }

  applyJob(jobId: number): void {
    this.jobId = jobId;
  }

  applyForJob(): void {
    if (this.jobId !== null && this.candidateName && this.candidateEmail) {
      this.http.post(`http://localhost:8081/api/jobs/${this.jobId}/apply`, {
        applicantName: this.candidateName,
        applicantEmail: this.candidateEmail
      })
        .subscribe(
          () => {
            this.jobId = null;
            this.candidateName = '';
            this.candidateEmail = '';
            this.message = 'Application submitted successfully!';
            setTimeout(() => this.message = null, 5000);
          },
          (error) => {
            this.error = 'Error submitting application: ' + error.message;
            setTimeout(() => this.error = null, 5000);
          }
        );
    } else {
      this.error = 'Please fill in all fields and select a job.';
      setTimeout(() => this.error = null, 5000);
    }
  }
}
