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
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.jobId = id ? +id : null; // Captura o ID do job da URL e converte para número
      if (this.jobId === null || isNaN(this.jobId)) {  // Verifica se o ID é válido
        this.error = 'Invalid job ID.';
        return;
      }
      console.log('Job ID:', this.jobId); // Verifica se o ID está correto
    });
  }

  applyForJob(): void {
    console.log('Applying for job with ID:', this.jobId);

    if (this.jobId === null) {  // Verifica se o ID do job foi capturado corretamente
      this.error = 'Invalid job ID.';
      return;
    }

    if (!this.candidateName || !this.candidateEmail) {  // Verifica se os campos estão preenchidos
      this.error = 'Please fill in all fields.';
      return;
    }

    const applicant = {
      applicantName: this.candidateName,
      applicantEmail: this.candidateEmail
    };

    console.log('Applicant data:', applicant);

    this.jobService.applyForJob(this.jobId, applicant).subscribe(
      response => {
        console.log('Application successful:', response);
        this.error = null;  // Limpa a mensagem de erro se a aplicação for bem-sucedida
        alert('Application submitted successfully!');  // Mensagem de sucesso
        this.router.navigate(['/jobs']);
      },
      error => {
        console.error('Error:', error); // Exibe o erro completo
        this.error = `Failed to apply for the job. Error: ${error.message || error.status}`;
      }
    );
  }

}
