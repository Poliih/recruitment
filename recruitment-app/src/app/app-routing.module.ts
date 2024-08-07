import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobListComponent } from './job-lis/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobListComponent, canActivate: [AuthGuard] },
  { path: 'job/:id', component: JobDetailComponent, canActivate: [AuthGuard] },
  { path: 'create-job', component: JobCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
