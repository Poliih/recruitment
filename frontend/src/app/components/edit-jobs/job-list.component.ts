import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Router, RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { Job } from '../job.model';
import { Application } from '../application.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf
  ]
})
export class JobListComponent implements OnInit {

  jobs: Job[] = [];
  applicationList: Application[] = [];
  showApplications = false;

  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe((data: Job[]) => {
      this.jobs = data;
    });
  }

  addJob(title: string, description: string): void {
    this.jobService.addJob({ title, description }).subscribe(() => {
      this.loadJobs();
    });
  }

  editJob(id: number): void {
    this.router.navigate([`/edit-job/${id}`]);
  }

  deleteJob(id: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(id).subscribe(() => {
        this.loadJobs();
      });
    }
  }

  viewApplications(jobId: number): void {
    this.jobService.getApplicationsForJob(jobId).subscribe((applications: Application[]) => {
      this.applicationList = applications;
      this.showApplications = true;
    });
  }

  hideApplications(): void {
    this.showApplications = false;
  }
}
