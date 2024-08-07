import { Component } from '@angular/core';
import { JobService } from '../auth/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html'
})
export class JobCreateComponent {
  job = { title: '', description: '' };

  constructor(private jobService: JobService, private router: Router) { }

  createJob(): void {
    this.jobService.createJob(this.job).subscribe(() => {
      this.router.navigate(['/jobs']);
    });
  }
}
