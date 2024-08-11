import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apply-form',
  templateUrl: './apply-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./apply-form.component.css']
})
export class ApplyFormComponent implements OnInit {
  jobId: string | null = null;
  candidateName: string = '';
  candidateEmail: string = '';
  message: string | null = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.jobId = params['jobId'] || null;
    });
  }

  applyForJob(): void {
    // Lógica para enviar o formulário
  }
}
