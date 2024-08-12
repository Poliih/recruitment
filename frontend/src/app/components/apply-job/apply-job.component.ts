import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {
  jobId: number | null = null;
  candidateName: string = '';
  candidateEmail: string = '';
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.jobId = id ? +id : null;
      if (this.jobId === null || isNaN(this.jobId)) {
        this.setMessage('Invalid job ID.', 'error');
        return;
      }
      console.log('Job ID:', this.jobId);
    });
  }

  applyForJob(): void {
    console.log('Applying for job with ID:', this.jobId);

    if (this.jobId === null) {
      this.setMessage('Invalid job ID.', 'error');
      return;
    }

    if (!this.candidateName || !this.candidateEmail) {
      this.setMessage('Please fill in all fields.', 'error');
      return;
    }

    const applicant = {
      applicantName: this.candidateName,
      applicantEmail: this.candidateEmail
    };

    this.jobService.applyForJob(this.jobId, applicant).subscribe(
      response => {
        console.log('Application successful:', response);
        this.setMessage('Application submitted successfully!', 'success');
        this.router.navigate(['/jobs']);
      },
      error => {
        console.error('Error:', error);
        this.setMessage(`Failed to apply for the job. Error: ${error.message || error.status}`, 'error');
      }
    );
  }

  private setMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;

    // Clear the message after 5 seconds
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 5000);
  }
}
