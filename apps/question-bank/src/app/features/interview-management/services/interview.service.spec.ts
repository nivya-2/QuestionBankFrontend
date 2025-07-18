import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InterviewService } from './interview.service.js';
import { Interview } from '../models/interview.js';
import { DetailedInterview } from '../models/detailed-interview.js';


describe('InterviewService', () => {
  let service: InterviewService;
  let httpMock: HttpTestingController;

  const mockInterviews: Interview[] = [
    {
      id: 1,
      role: 'Frontend Developer',
      createdOn: '2025-07-01',
      createdBy: 'John Doe',
      status: 'New',
    },
    {
      id: 2,
      role: 'Backend Developer',
      createdOn: '2025-07-02',
      createdBy: 'Jane Smith',
      status: 'Draft',
    }
  ];

   const mockInterviewById: DetailedInterview = {
    role: 'Frontend Developer',
    createdBy: 'John Doe',
    experience: 3,
    interviewStatus: 'Draft',
    interviewSkills: ['Angular', 'TypeScript', 'HTML']
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InterviewService],
    });

    service = TestBed.inject(InterviewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch interviews via GET', () => {
    service.getInterviews().subscribe((data) => {
      expect(data).toEqual(mockInterviews);
    });

    const req = httpMock.expectOne('https://localhost:7215/api/interviews');
    expect(req.request.method).toBe('GET');
    req.flush(mockInterviews); 
  });

  it('should fetch interview by ID via GET', () => {
    const interviewId = 1;

    service.getInterviewById(interviewId).subscribe((data) => {
      expect(data).toEqual(mockInterviewById);
    });

    const req = httpMock.expectOne(`https://localhost:7215/api/interviews/${interviewId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockInterviewById);
  });
});
