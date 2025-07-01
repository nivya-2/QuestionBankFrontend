import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageInterview } from './manage-interview';

describe('ManageInterview', () => {
  let component: ManageInterview;
  let fixture: ComponentFixture<ManageInterview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInterview],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageInterview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
