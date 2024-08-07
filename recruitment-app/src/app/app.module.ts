import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { AppRoutingModule } from './app-routing.module'; // Importar AppRoutingModule
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JobListComponent } from './job-lis/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobListComponent,
    JobDetailComponent,
    JobCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Importar o módulo de roteamento
    RouterModule // Importar RouterModule para permitir o uso de routerLink
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
