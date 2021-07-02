import { TestBed } from '@angular/core/testing';

import { VaccinegroupsServiceService } from './vaccinegroups-service.service';

describe('VaccinegroupsServiceService', () => {
  let service: VaccinegroupsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinegroupsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
