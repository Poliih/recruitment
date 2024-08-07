import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Importar RouterModule aqui

@Component({
  standalone: true,
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  imports: [CommonModule, RouterModule]  // Adicionar RouterModule à lista de imports
})
export class JobListComponent {
  jobs: any[] = [];  // Definir jobs como um array de qualquer tipo
}
