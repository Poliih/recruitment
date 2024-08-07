import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importar FormsModule aqui

@Component({
  standalone: true,
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  imports: [FormsModule]  // Adicionar FormsModule à lista de imports
})
export class ApplicationComponent {
  applicantName: string = '';
  applicantEmail: string = '';

  apply() {
    // Lógica de envio da aplicação
    console.log('Application submitted', this.applicantName, this.applicantEmail);
  }
}
