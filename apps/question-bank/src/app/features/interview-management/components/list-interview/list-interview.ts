import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { InterviewService } from '../../services/interview.js'; 
import { Interview } from '../../models/interview.js';
import { Router } from '@angular/router';
// List Interview screen is displayed when user navigates to '/interviews' route or is redirected here from the root path.

// Following columns and actions are displayed in the interview table. Data for them will be fetched from GET /api/interviews
// 1. S.No - Auto-generated serial number based on the display index.
// 2. Role - Displays the interview role.
// 3. Created On - Date when the interview was created.
// 4. Created By - Displays the creator of the interview.
// 5. Status - Current status of the interview (e.g. New, Draft, Submitted, Inactive).
// 6. Actions - Displays two buttons:
//    a. View - Navigates to Interview Details screen for the selected interview.
//    b. Deactivate - Deactivates the selected interview. Changes status to 'Inactive'.

@Component({
  selector: 'app-list-interview',
  standalone: true,
  imports: [CommonModule, GridModule, ButtonModule],
  templateUrl: './list-interview.html',
  styleUrl: './list-interview.css',
})

export class ListInterview implements OnInit {
  private interviewService = inject(InterviewService);
  private router = inject(Router);

  readonly interviews = signal<Interview[]>([]);

  ngOnInit(): void {
    this.interviewService.getInterviews().subscribe({
      next: (data) => this.interviews.set(data),
      error: (err) => console.error('Failed to fetch interviews', err),
    });
  }

  viewInterview(id: number): void {
    this.router.navigate(['/interviews', id]);
  }

  deactivateInterview(interview: Interview): void {
    this.interviews.update((all) =>
      all.map((i) =>
        i.id === interview.id ? { ...i, status: 'Inactive' } : i
      )
    );
  }
}