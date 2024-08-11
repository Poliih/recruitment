import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-edit-jobs',
  templateUrl: './edit-jobs.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./edit-jobs.component.css']
})
export class JobEditComponent implements OnInit {

  jobId: number | null = null;
  title: string = '';
  description: string = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobId = +params.get('id')!;
      this.loadJob();
    });
  }

  loadJob(): void {
    if (this.jobId !== null) {
      this.jobService.getJobById(this.jobId).subscribe(job => {
        this.title = job.title;
        this.description = job.description;
      });
    }
  }

  updateJob(): void {
    if (this.jobId !== null) {
      this.jobService.updateJob(this.jobId, { title: this.title, description: this.description })
        .subscribe(() => {
          this.router.navigate(['/jobs']);
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/jobs']);
  }
}
