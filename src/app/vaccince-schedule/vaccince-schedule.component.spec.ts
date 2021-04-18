import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinceScheduleComponent } from './vaccince-schedule.component';

describe('VaccinceScheduleComponent', () => {
  let component: VaccinceScheduleComponent;
  let fixture: ComponentFixture<VaccinceScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinceScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinceScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
