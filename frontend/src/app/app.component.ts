import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuComponent} from "@app/components/menu/menu.component";
import {FooterComponent} from "@app/components/footer/footer.component";
import {ApplicationComponent} from "@app/components/application/application.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ApplyJobComponent} from "@app/components/apply-job/apply-job.component";
import {HomeComponent} from "@app/components/home/home.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MenuComponent,
    HttpClientModule,
    FooterComponent,
    FormsModule,
    CommonModule,

    ApplyJobComponent,
    ApplicationComponent, HomeComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'frontend';
}
