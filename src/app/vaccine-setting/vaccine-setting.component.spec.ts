import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineSettingComponent } from './vaccine-setting.component';

describe('VaccineSettingComponent', () => {
  let component: VaccineSettingComponent;
  let fixture: ComponentFixture<VaccineSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
