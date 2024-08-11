import { Routes } from '@angular/router'; // Importa o tipo Routes para definir as rotas

import { ApplicationComponent } from "@app/components/application/application.component"; // Importa o componente ApplicationComponent
import { ApplyJobComponent } from "@app/components/apply-job/apply-job.component";
import {HomeComponent} from "@app/components/home/home.component";
import {EditJobsComponent} from "@app/components/edit-jobs/edit-jobs.component"; // Importa o componente ApplyJobComponent

// Define as rotas do aplicativo
export const routes: Routes = [
  { path: "application", component: ApplicationComponent },
  { path: "apply-job/:id", component: ApplyJobComponent } ,
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: '/home', pathMatch: 'full' },
  { path: "edit-jobs", component: EditJobsComponent },
];
