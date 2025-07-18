import { TestBed } from '@angular/core/testing';
import { ListInterview } from './list-interview';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { Interview } from '../../models/interview';
import { InterviewService } from '../../services/interview.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { provideHttpClient } from '@angular/common/http';

describe('ListInterview Component (Interview list screen)', () => {
  //Mock Data
  const mockInterviews: Interview[] = [
    {
      id: 1,
      role: 'Frontend Developer',
      createdOn: '2025-07-01',
      createdBy: 'Alice',
      status: 'New',
    },
    {
      id: 2,
      role: 'Backend Developer',
      createdOn: '2025-07-01',
      createdBy: 'Bob',
      status: 'Submitted',
    },
    {
      id: 3,
      role: 'QA Analyst',
      createdOn: '2025-07-01',
      createdBy: 'Carol',
      status: 'Draft',
    },
  ];

  //Mock Error Response
  const errorResponse = new Error('Network error');

  // Helper function to create the component and return necessary variables
  function createComponent() {
    const fixture = TestBed.createComponent(ListInterview);
    const component = fixture.componentInstance;
    const notificationService =
      fixture.debugElement.injector.get(NotificationService);
    const interviewService =
      fixture.debugElement.injector.get(InterviewService);
    const spyGetInterviews = jest
      .spyOn(interviewService, 'getInterviews')
      .mockReturnValue(of(mockInterviews));
    const spyShowNotification = jest.spyOn(notificationService, 'show');
    fixture.detectChanges(); //remove this from unneeded places
    return {
      component,
      notificationService,
      interviewService,
      fixture,
      spyGetInterviews,
      spyShowNotification,
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInterview, GridModule, ButtonModule],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it('should create the component', () => {
    const { component } = createComponent();
    expect(component).toBeTruthy();
  });

  it('should display one row for each interview', () => {
    const { fixture } = createComponent();
    const gridRows =
      fixture.nativeElement.querySelectorAll('kendo-grid-list tr');
    expect(gridRows.length).toBe(3);
  });

  it('should display all interview roles', () => {
    const { fixture } = createComponent();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain(mockInterviews[0].role);
    expect(text).toContain(mockInterviews[1].role);
    expect(text).toContain(mockInterviews[2].role);
  });

  it('should pass the correct Interview ID when "View" button is clicked', () => {
    const { component, fixture } = createComponent();
    const spy = jest.spyOn(component, 'viewInterview');
    const viewButtons = fixture.debugElement.queryAll(
      By.css('button:not([themeColor="error"])')
    );
    viewButtons[0].nativeElement.click();
    expect(spy).toHaveBeenCalledWith(mockInterviews[0].id);
  });

  it('should update interview status to "Inactive" when "Deactivate" button is clicked', () => {
    const { component } = createComponent();
    const interview = mockInterviews[0];
    interview.status = 'Active';
    component.deactivateInterview(interview);
    const updated = component.interviews.find((i) => i.id === interview.id);
    expect(updated?.status).toBe('Inactive');
  });

  it('should display deactivate button as disabled for inactive interviews', () => {
    const inactiveInterview: Interview = {
      id: 4,
      role: 'DevOps Engineer',
      createdOn: '2025-07-01',
      createdBy: 'Dan',
      status: 'Inactive',
    };
    const { component, fixture } = createComponent();
    component.interviews = [...component.interviews, inactiveInterview];
    fixture.detectChanges();
    const deactivateButtons = fixture.debugElement.queryAll(
      By.css('button[themeColor="error"]')
    );
    const lastDeactivateButton =
      deactivateButtons[deactivateButtons.length - 1].nativeElement;
    expect(lastDeactivateButton.disabled).toBe(true);
  });

  it('should display only the header row when there are no interviews', () => {
    const { component, fixture } = createComponent();
    component.interviews = [];
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('kendo-grid-list tr');
    expect(rows.length).toBe(1);
  });

  it('should handle error when fetching interviews fails', () => {
    const { spyGetInterviews, component } = createComponent();
    spyGetInterviews.mockReturnValueOnce(throwError(() => errorResponse));
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    component.ngOnInit();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to fetch interviews',
      errorResponse
    );
    consoleSpy.mockRestore();
  });

  it('should fetch interviews and set them via the service', () => {
    const { component, interviewService } = createComponent();
    const spy = jest.spyOn(interviewService, 'getInterviews');
    expect(component.interviews).toEqual(mockInterviews);
    expect(spy).toHaveBeenCalled();
  });

  it('should show error notification when interview fetch fails', () => {
    const { component, spyShowNotification, spyGetInterviews } =
      createComponent();
    spyGetInterviews.mockReturnValueOnce(
      throwError(() => new Error('Simulated fetch failure'))
    );
    component.ngOnInit();
    expect(spyShowNotification).toHaveBeenCalled();
  });
});
