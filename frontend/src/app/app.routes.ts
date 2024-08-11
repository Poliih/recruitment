import { Routes } from '@angular/router'; // Importa o tipo Routes para definir as rotas

import { ApplicationComponent } from "@app/components/application/application.component"; // Importa o componente ApplicationComponent
import { ApplyJobComponent } from "@app/components/apply-job/apply-job.component"; // Importa o componente ApplyJobComponent

// Define as rotas do aplicativo
export const routes: Routes = [
  { path: "application", component: ApplicationComponent }, // Rota para ApplicationComponent
  { path: "apply-job/:id", component: ApplyJobComponent } // Rota para ApplyJobComponent com parâmetro dinâmico `id`
];
