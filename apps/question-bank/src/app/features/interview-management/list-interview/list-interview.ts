import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// List Interview
// List Interview screen is displayed when user accesses the root of the site.

// Following columns and actions are displayed in tabular format. Data for them will be fetched from GET /api/interviews
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
  imports: [CommonModule],
  templateUrl: './list-interview.html',
  styleUrl: './list-interview.css',
})
export class ListInterview {}
