import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineImageComponent } from './vaccine-image.component';

describe('VaccineImageComponent', () => {
  let component: VaccineImageComponent;
  let fixture: ComponentFixture<VaccineImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
