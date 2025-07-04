import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// View Interview Details
// View Interview Details screen is displayed when user clicks the 'View' button against a interview 
// on the List Interview screen.

// Following details are displayed. Data for them will be fetched from GET /api/interviews/{id}
// 1. Role - Displays the interview role.
// 2. Created By - Displays the creator of the interview.
// 3. Experience in Years - Displays the experience required for the interview.
// 4. Skills - Displays the list of skill names associated with the interview.
// 5. Status - Current status of the interview (e.g. Draft, Submitted, Inactive).
// 6. Actions:
//    a. Next - Navigates to Interview Questions screen for the interview.
//    b. Edit - To modify the interview details for the selected interview.

@Component({
  selector: 'app-interview-details',
  imports: [CommonModule],
  templateUrl: './interview-details.html',
  styleUrl: './interview-details.css',
})
export class InterviewDetails {}
