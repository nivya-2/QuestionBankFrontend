import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListInterview } from './list-interview';
import { By} from '@angular/platform-browser';
import { of,throwError } from 'rxjs';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { Interview } from '../../models/Interview';
import { provideHttpClient } from '@angular/common/http';

describe('ListInterview Component', () => {
  let component: ListInterview;
  let fixture: ComponentFixture<ListInterview>;

  const mockInterviews: Interview[] = [
    { id: 1, role: 'Frontend Developer', createdOn: '2025-07-01', createdBy: 'Alice', status: 'New' },
    { id: 2, role: 'Backend Developer', createdOn: '2025-07-01', createdBy: 'Bob', status: 'Submitted' },
    { id: 3, role: 'QA Analyst', createdOn: '2025-07-01', createdBy: 'Carol', status: 'Draft' },
  ];
  const errorResponse = new Error('Network error');


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInterview, GridModule, ButtonModule],
       providers: [
      provideHttpClient()
    ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListInterview);
    component = fixture.componentInstance;

    // Manually inject mock interview data into signal
    component.interviews.set(mockInterviews);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of rows', () => {
    const gridRows = fixture.nativeElement.querySelectorAll('kendo-grid-list tr');
    expect(gridRows.length).toBeGreaterThan(1); // header + rows
  });

  it('should render all interview roles', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Frontend Developer');
    expect(text).toContain('Backend Developer');
    expect(text).toContain('QA Analyst');
  });

  it('should call viewInterview with correct ID when "View" is clicked', () => {
    const spy = jest.spyOn(component, 'viewInterview');

    const viewButtons = fixture.debugElement.queryAll(By.css('button:not([themeColor="error"])'));
    viewButtons[0].nativeElement.click();

    expect(spy).toHaveBeenCalledWith(mockInterviews[0].id);
  });

  it('should update interview status to "Inactive" when "Deactivate" is clicked', () => {
    const interview = mockInterviews[0];
    expect(interview.status).not.toBe('Inactive');

    component.deactivateInterview(interview);
    const updated = component.interviews().find(i => i.id === interview.id);

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

    const deactivateButtons = fixture.debugElement.queryAll(By.css('button[themeColor="error"]'));
    const lastButton = deactivateButtons[deactivateButtons.length - 1].nativeElement;

    expect(lastButton.disabled).toBe(true);
  });

  it('should handle empty interview list gracefully', () => {
    component.interviews.set([]);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('kendo-grid-list tr');
    expect(rows.length).toBe(1); // only header row
  });
 it('should handle error when fetching interviews fails', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // Mock the service BEFORE component creation
  const service = TestBed.inject(component['interviewService'].constructor);
  jest.spyOn(service, 'getInterviews').mockReturnValue(throwError(() => errorResponse));

  // Recreate the component AFTER mocking service
  fixture = TestBed.createComponent(ListInterview);
  component = fixture.componentInstance;

  fixture.detectChanges(); // triggers ngOnInit()

  expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch interviews', errorResponse);

  consoleSpy.mockRestore();
});
it('should fetch interviews and set them via service in ngOnInit()', () => {
  const mockService = TestBed.inject(component['interviewService'].constructor);
  const spy = jest.spyOn(mockService, 'getInterviews').mockReturnValue(of(mockInterviews));

  // Recreate component to re-trigger ngOnInit
  fixture = TestBed.createComponent(ListInterview);
  component = fixture.componentInstance;

  fixture.detectChanges();

  expect(component.interviews()).toEqual(mockInterviews);
  expect(spy).toHaveBeenCalled();
});


});
