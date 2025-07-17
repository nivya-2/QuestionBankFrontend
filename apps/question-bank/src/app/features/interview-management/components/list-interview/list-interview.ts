import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, KENDO_GRID } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { InterviewService } from '../../services/interview-management/get-all-interviews.service';
import { Interview } from '../../models/interview.js';
import { InterviewStatus } from '../../enums/interview-status.enum';
import { NotificationModule, NotificationService } from '@progress/kendo-angular-notification';

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
  imports: [CommonModule, GridModule, ButtonModule, KENDO_GRID,NotificationModule],
  templateUrl: './list-interview.html',
  styleUrl: './list-interview.css',
})
export class ListInterview implements OnInit {
  readonly interviewStatus = InterviewStatus;
  private interviewService = inject(InterviewService);
  private notificationService = inject(NotificationService);
  interviews: Interview[] = [];

  ngOnInit(): void {
    this.interviewService.getInterviews().subscribe({
      next: (data) => (this.interviews = data),
      error: (err) => {
        console.error('Failed to fetch interviews', err);
        this.notificationService.show({
          content: 'Failed to load interviews. Please check your connection.',
          cssClass: 'k-notification-custom-large',
          animation: { type: 'fade', duration: 400 },
          position: { horizontal: 'right', vertical: 'top' },
          type: { style: 'error', icon: true },
          hideAfter: 5000,
        });
      },      
    });
  }

  /**
   * Should navigate to the interview details screen for the selected interview.
   *
   * @param id - The unique identifier of the interview to view.
   */
  viewInterview(id: number): void {
    // Logic to navigate to interview details screen
  }

  /**
   * Marks the clicked interview as 'Inactive' by updating its status in the interviews signal.
   *
   * @param interview - The interview object to deactivate.
   */
  deactivateInterview(interview: Interview): void {
    //api call placeholder
    this.interviews = this.interviews.map((existingInterview) =>
      existingInterview.id === interview.id
        ? { ...existingInterview, status: InterviewStatus.INACTIVE }
        : existingInterview
    );
  }
}
