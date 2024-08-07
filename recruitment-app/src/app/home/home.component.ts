import { Component, OnInit } from '@angular/core';
import { JobService } from '../auth/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  jobs: any[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }
}
