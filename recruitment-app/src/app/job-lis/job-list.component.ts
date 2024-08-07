import { Component, OnInit } from '@angular/core';
import { JobService } from '../auth/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }
}
