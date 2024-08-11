import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [
    NgForOf, HttpClientModule, NgIf, FormsModule, CommonModule
  ],
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  jobs: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.http.get<any[]>('http://localhost:8081/api/jobs')
      .subscribe({
        next: (data) => {
          this.jobs = data;
        },
        error: (error) => {
          console.error('Error fetching jobs:', error);
        }
      });
  }

  navigateToApplyPage(jobId: number): void {
    this.router.navigate(['/apply-job', jobId]);
  }
}
