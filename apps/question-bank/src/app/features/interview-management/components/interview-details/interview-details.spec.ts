import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterviewDetails } from './interview-details';
import { DetailedInterview } from '../../models/detailed-interview';
import { provideHttpClient } from '@angular/common/http';
import { InterviewService } from '../../services/interview';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('InterviewDetails', () => {
  let component: InterviewDetails;
  let fixture: ComponentFixture<InterviewDetails>;

  const mockInterview: DetailedInterview = {
    role: 'Frontend Developer',
    createdBy: 'Alice',
    experience: 3.5,
    interviewSkills: ['Jest', 'Angular'],
    interviewStatus: 'New',
  };

  const mockInterviewService = {
    getInterviewById: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewDetails],
      providers: [
        provideHttpClient(),
        { provide: InterviewService, useValue: mockInterviewService },
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

    fixture = TestBed.createComponent(InterviewDetails);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch interview by ID on ngOnInit', () => {
    mockInterviewService.getInterviewById.mockReturnValue(of(mockInterview));
    fixture.detectChanges(); 

    expect(component.interview()).toEqual(mockInterview);
  });

  it('should call getInterviewById with correct ID on ngOnInit', () => {
    mockInterviewService.getInterviewById.mockReturnValue(of(mockInterview));
    fixture.detectChanges(); 

    expect(mockInterviewService.getInterviewById).toHaveBeenCalledWith(1);
  });

  describe('when fetching interview fails', () => {
    const error = new Error('Network error');
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockInterviewService.getInterviewById.mockReturnValue(throwError(() => error));
      fixture.detectChanges(); 
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should set interview to null', () => {
      expect(component.interview()).toBeNull();
    });

    it('should log error to console', () => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch interview details', error);
    });
  });
});
