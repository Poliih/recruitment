import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Job } from '../job.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }
}
