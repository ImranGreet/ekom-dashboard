import { TestBed } from '@angular/core/testing';

import { PurchasediteamsService } from './purchasediteams.service';

describe('PurchasediteamsService', () => {
  let service: PurchasediteamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasediteamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
