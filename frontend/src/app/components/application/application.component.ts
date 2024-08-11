import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [
    NgForOf, HttpClientModule, NgIf, FormsModule
  ],
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  jobs: any[] = []; // Array to hold job data
  selectedJobId: string | null = null; // Variável para armazenar o ID do job selecionado
  candidateName: string = ''; // Variável para o nome do candidato
  candidateEmail: string = ''; // Variável para o e-mail do candidato
  message: string | null = null; // Variável para mensagens de sucesso
  error: string | null = null; // Variável para mensagens de erro

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.http.get<any[]>('http://localhost:8081/api/jobs')
      .subscribe(
        (data) => {
          this.jobs = data;
        },
        (error) => {
          console.error('Error fetching jobs:', error);
        }
      );
  }


  applyJob(event: MouseEvent, jobId: string): void {
    event.preventDefault(); // Impede o comportamento padrão do link
    this.selectedJobId = jobId; // Define o ID do trabalho selecionado
    window.scrollTo(0, document.body.scrollHeight); // Rola até o formulário de aplicação
  }


  applyForJob(): void {
    const jobId = this.selectedJobId;
    const name = this.candidateName;
    const email = this.candidateEmail;

    if (jobId && name && email) {
      this.http.post(`http://localhost:8081/api/jobs/${jobId}/apply`, {
        applicantName: name,
        applicantEmail: email
      })
        .subscribe(
          () => {
            this.selectedJobId = null;
            this.candidateName = '';
            this.candidateEmail = '';
            this.message = 'Application submitted successfully!';
            setTimeout(() => this.message = null, 5000);
          },
          (error) => {
            this.error = 'Error submitting application: ' + error.message;
            setTimeout(() => this.error = null, 5000);
          }
        );
    }
  }
}
