import { TestBed } from '@angular/core/testing';

import { VaccinesettingServiceService } from './vaccinesetting-service.service';

describe('VaccinesettingServiceService', () => {
  let service: VaccinesettingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinesettingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
