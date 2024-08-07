import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importar RouterModule aqui

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule]  // Adicionar RouterModule à lista de imports
})
export class HomeComponent { }
