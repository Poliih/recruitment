import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../auth/job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit {
  job: any;

  constructor(private route: ActivatedRoute, private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const jobId = +id; // Converte para número
      this.jobService.getJob(jobId).subscribe(data => {
        this.job = data;
      });
    } else {
      console.error('Job ID is null or undefined');
      this.router.navigate(['/jobs']); // Navega para a lista de vagas se o ID não for válido
    }
  }

  apply(): void {
    // Lógica para candidatura
  }
}
