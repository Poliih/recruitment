import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {JobListComponent} from "./components/job-list/job-list.component";
import {MenuComponent} from "@app/components/menu/menu.component";
import {FooterComponent} from "@app/components/footer/footer.component";
import {ApplicationComponent} from "@app/components/application/application.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    JobListComponent,
    MenuComponent,
    HttpClientModule,
    FooterComponent,
    ApplicationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
