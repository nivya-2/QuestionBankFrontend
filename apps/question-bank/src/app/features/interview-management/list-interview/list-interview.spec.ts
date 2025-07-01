import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListInterview } from './list-interview';

describe('ListInterview', () => {
  let component: ListInterview;
  let fixture: ComponentFixture<ListInterview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInterview],
    }).compileComponents();

    fixture = TestBed.createComponent(ListInterview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
