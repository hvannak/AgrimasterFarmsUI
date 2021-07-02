import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineGroupsComponent } from './vaccine-groups.component';

describe('VaccineGroupsComponent', () => {
  let component: VaccineGroupsComponent;
  let fixture: ComponentFixture<VaccineGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
