import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { ApplicationService } from '../application.service';
import { Job } from '../job.model';
import { Application } from '../application.model';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit {
  job: Job | undefined;
  applicantName = '';
  applicantEmail = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private applicationService: ApplicationService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('jobId'));
    this.jobService.getJob(id).subscribe(job => {
      this.job = job;
    });
  }

  apply() {
    if (this.job) {
      const application: Application = {
        jobId: this.job.id!,
        applicantName: this.applicantName,
        applicantEmail: this.applicantEmail
      };
      this.applicationService.apply(application).subscribe(response => {
        console.log('Application submitted', response);
        this.router.navigate(['/jobs']);
      });
    }
  }
}
