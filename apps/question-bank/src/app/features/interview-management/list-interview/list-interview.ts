import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// List Interview
// List Interview screen is displayed when user navigates to '/interviews' route or is redirected here from the root path.

// Following columns and actions are displayed in the interview table:
// 1. S.No - Auto-generated serial number based on the display index.
// 2. Role - Displays the interview role.
// 3. Created On - Date when the interview was created.
// 4. Created By - Displays the creator of the interview.
// 5. Status - Current status of the interview (e.g. New, Draft, Submitted).
// 6. Actions - Always displays two buttons:
//    a. View - Navigates to 'manage-interview' component, passing the interviewId.
//    b. Deactivate - Triggers an API call to delete the interview and removes it from the list on success.

// View Button:
// - Navigates to the 'manage-interview' component using Angular router.
// - interviewId is passed as a route parameter.
// - InterviewId is not displayed in the table but used internally for routing.

// Deactivate Button:
// - On click, triggers an API call to the backend to delete the interview.
// - Loader/spinner is displayed during the process.
// - If API call is successful, removes the interview from the UI list.
// - If API call fails, keeps the row unchanged and displays error.
// - Button is disabled during the API operation to prevent multiple calls.
@Component({
  selector: 'app-list-interview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-interview.html',
  styleUrl: './list-interview.css',
})
export class ListInterview {}
