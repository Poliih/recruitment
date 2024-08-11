import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private selectedJobId: string | null = null;

  setSelectedJobId(jobId: string): void {
    this.selectedJobId = jobId;
  }

  getSelectedJobId(): string | null {
    return this.selectedJobId;
  }
}
