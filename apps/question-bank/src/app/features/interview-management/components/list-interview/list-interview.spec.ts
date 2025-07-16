import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListInterview } from './list-interview';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { Interview } from '../../models/interview';
import { InterviewService } from '../../services/interview-management/get-all-interviews.service';

describe('ListInterview Component (Interview list screen)', () => {
  let component: ListInterview;
  let fixture: ComponentFixture<ListInterview>;

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
  const errorResponse = new Error('Network error');

  class MockInterviewService {
    getInterviews = jest.fn().mockReturnValue(of(mockInterviews));
  }

  function createComponent() {
    fixture = TestBed.createComponent(ListInterview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInterview, GridModule, ButtonModule],
      providers: [
        { provide: InterviewService, useClass: MockInterviewService },
      ],
    }).compileComponents();

    createComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render one row for each interview plus the header row', () => {
    const gridRows =
      fixture.nativeElement.querySelectorAll('kendo-grid-list tr');
    expect(gridRows.length).toBeGreaterThan(1);
  });

  it('should render all interview roles', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Frontend Developer');
    expect(text).toContain('Backend Developer');
    expect(text).toContain('QA Analyst');
  });

  it('should call viewInterview function with correct interview ID when the "View" button is clicked', () => {
    const spy = jest.spyOn(component, 'viewInterview');

    const viewButtons = fixture.debugElement.queryAll(
      By.css('button:not([themeColor="error"])')
    );
    viewButtons[0].nativeElement.click();

    expect(spy).toHaveBeenCalledWith(mockInterviews[0].id);
  });

  it('should update interview status to "Inactive" when "Deactivate" button is clicked', () => {
    const interview = mockInterviews[0];
    expect(interview.status).not.toBe('Inactive');

    component.deactivateInterview(interview);
    const updated = component.interviews().find((i) => i.id === interview.id);

    expect(updated?.status).toBe('Inactive');
  });

  it('should render deactivate button as disabled for inactive interviews', () => {
    const inactiveInterview: Interview = {
      id: 4,
      role: 'DevOps Engineer',
      createdOn: '2025-07-01',
      createdBy: 'Dan',
      status: 'Inactive',
    };

    component.interviews.set([...component.interviews(), inactiveInterview]);
    fixture.detectChanges();

    const deactivateButtons = fixture.debugElement.queryAll(
      By.css('button[themeColor="error"]')
    );
    const lastButton =
      deactivateButtons[deactivateButtons.length - 1].nativeElement;

    expect(lastButton.disabled).toBe(true);
  });

  it('should render only the header row when there are no interviews', () => {
    component.interviews.set([]);
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('kendo-grid-list tr');
    expect(rows.length).toBe(1);
  });

  it('should handle error when fetching interviews fails', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const mockService = TestBed.inject(
      InterviewService
    ) as jest.Mocked<InterviewService>;
    mockService.getInterviews.mockReturnValueOnce(
      throwError(() => errorResponse)
    );

    createComponent();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to fetch interviews',
      errorResponse
    );

    consoleSpy.mockRestore();
  });

  it('should fetch interviews and set them via service in ngOnInit()', () => {
    const mockService = TestBed.inject(InterviewService) as jest.Mocked<InterviewService>;
    const spy = mockService.getInterviews;

    createComponent();

    expect(component.interviews()).toEqual(mockInterviews);
    expect(spy).toHaveBeenCalled();
  });
});
