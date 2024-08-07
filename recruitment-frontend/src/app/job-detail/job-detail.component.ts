import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
  imports: [CommonModule, RouterModule]
})
export class JobDetailComponent {
  @Input() job: any;  // Definir a propriedade job como um Input
}
