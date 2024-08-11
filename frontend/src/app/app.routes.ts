import { Routes } from '@angular/router';

import {ApplicationComponent} from "@app/components/application/application.component";
import {ApplyFormComponent} from "@app/components/apply-form/apply-form.component";

export const routes: Routes = [
  { path: "application", component: ApplicationComponent },
  { path: "apply-form/:jobId", component: ApplyFormComponent },

];

