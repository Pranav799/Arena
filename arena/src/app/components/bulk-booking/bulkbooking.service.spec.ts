import { TestBed } from '@angular/core/testing';

import { BulkbookingService } from './bulkbooking.service';

describe('BulkbookingService', () => {
  let service: BulkbookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkbookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
