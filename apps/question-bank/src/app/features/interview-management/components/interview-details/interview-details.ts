import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedInterview } from '../../models/detailed-interview';
import { InterviewService } from '../../services/interview.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  InputsModule,
  NumericTextBoxModule,
} from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationService } from '@progress/kendo-angular-notification';

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

// Add Interview
// Add Interview screen is displayed when the user clicks the 'Add' button on the 
// List Interview screen to create a new interview record.

// An empty form is displayed with all fields editable. Once filled, the user can save the interview details 
// via the Save button. On successful save, a confirmation notification is shown.

// Following details are to be provided by the user:
// 1. Role - Role for the interview.
// 2. Created By - The name of the person creating the interview.
// 3. Experience in Years - Experience required for the interview.
// 4. Skills - Selectable list of skill names to associate with the interview.

// Actions:
//    a. Save - Saves the newly entered interview data by calling POST /api/interviews.

@Component({
  selector: 'app-interview-details',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonsModule,
    NumericTextBoxModule,
    DropDownsModule,
  ],
  templateUrl: './interview-details.html',
  styleUrl: './interview-details.css',
})
export class InterviewDetails implements OnInit {
  interviewForm!: FormGroup;
  isEdit = false;

  private interviewService = inject(InterviewService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  readonly allSkills = ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'HTML', 'CSS'];
  readonly interview = signal<DetailedInterview | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.interviewService.getInterviewById(id).subscribe({
        next: (data) => {
          this.interview.set(data);
          this.buildForm(data);
        },
        error: (err) => {
          console.error('Failed to fetch interview details', err);
          this.notificationService.show({
            content:
              'Failed to fetch interview details. Please check your connection.',
            cssClass: 'k-notification-custom-large',
            animation: { type: 'fade', duration: 400 },
            position: { horizontal: 'right', vertical: 'top' },
            type: { style: 'error', icon: true },
            hideAfter: 5000,
          });
        },
      });
    }
  }

  /**
   * Builds a read-only form using interview data.
   * @param data - Interview details
   */
  private buildForm(data: DetailedInterview) {
    this.interviewForm = this.fb.group({
      role: [{ value: data.role, disabled: true }],
      createdBy: [{ value: data.createdBy, disabled: true }],
      experience: [{ value: data.experience, disabled: true }],
      interviewSkills: [{ value: data.interviewSkills, disabled: true }],
      interviewStatus: [{ value: data.interviewStatus, disabled: true }],
    });
  }

  /**
   * Toggles form controls between editable and read-only.
   */
  toggleEdit() {
    this.isEdit = !this.isEdit;
    const method = this.isEdit ? 'enable' : 'disable';
    Object.values(this.interviewForm.controls).forEach((control) =>
      control[method]()
    );
  }
}