import { TestBed } from '@angular/core/testing';

import { VaccineServiceService } from './vaccine-service.service';

describe('VaccineServiceService', () => {
  let service: VaccineServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
