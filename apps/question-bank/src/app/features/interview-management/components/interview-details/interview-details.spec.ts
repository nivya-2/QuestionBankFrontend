import { TestBed } from '@angular/core/testing';
import { InterviewDetails } from './interview-details';
import { DetailedInterview } from '../../models/detailed-interview';
import { provideHttpClient } from '@angular/common/http';
import { InterviewService } from '../../services/interview.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NotificationService } from '@progress/kendo-angular-notification';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('InterviewDetails Component (Interview details screen)', () => {
  const mockInterview: DetailedInterview = {
    role: 'Frontend Developer',
    createdBy: 'Alice',
    experience: 3.5,
    interviewSkills: ['Jest', 'Angular'],
    interviewStatus: 'New',
  };

  const errorResponse = new Error('Network error');

  function createComponent(autoDetect = true) {
    const fixture = TestBed.createComponent(InterviewDetails);
    const component = fixture.componentInstance;
    const notificationService =
      fixture.debugElement.injector.get(NotificationService);
    const interviewService =
      fixture.debugElement.injector.get(InterviewService);
    const spyGetInterviewById = jest
      .spyOn(interviewService, 'getInterviewById')
      .mockReturnValue(of(mockInterview));
    const spyShowNotification = jest.spyOn(notificationService, 'show');

    if (autoDetect) {
      fixture.detectChanges();
    }
    return {
      fixture,
      component,
      notificationService,
      interviewService,
      spyGetInterviewById,
      spyShowNotification,
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewDetails],
      providers: [
        provideHttpClient(),
        provideAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const { component } = createComponent();
    expect(component).toBeTruthy();
  });

  it('should fetch interview by ID and build form', () => {
    const { component } = createComponent();
    expect(component.interview()).toEqual(mockInterview);
    expect(component.interviewForm.value.role).toBe(mockInterview.role);
  });

  it('should call getInterviewById with correct ID', () => {
    const { spyGetInterviewById } = createComponent();
    expect(spyGetInterviewById).toHaveBeenCalledWith(1);
  });

  it('should handle error when fetching interview fails', () => {
    const spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { component, spyGetInterviewById } = createComponent(false);

    spyGetInterviewById.mockReturnValueOnce(throwError(() => errorResponse));
    component.ngOnInit();

    expect(component.interview()).toBeNull();
    expect(spyError).toHaveBeenCalledWith(
      'Failed to fetch interview details',
      errorResponse
    );
    spyError.mockRestore();
  });

  it('should show error notification when fetch fails', () => {
    const { component, spyGetInterviewById, spyShowNotification } =
      createComponent(false);

    spyGetInterviewById.mockReturnValueOnce(throwError(() => errorResponse));
    component.ngOnInit();

    expect(spyShowNotification).toHaveBeenCalled();
  });

  it('should toggle edit mode and enable/disable form controls', ()=>{
    const {component} =createComponent();

    const isInitiallyDisabled = component.interviewForm.controls['role'].disabled;
    expect(isInitiallyDisabled).toBe(true);

    component.toggleEdit();
    expect(component.interviewForm.controls['role'].enabled).toBe(true);
    
    component.toggleEdit();
    expect(component.interviewForm.controls['role'].disabled).toBe(true);
  });
});