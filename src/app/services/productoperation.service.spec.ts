import { TestBed } from '@angular/core/testing';

import { ProductoperationService } from './productoperation.service';

describe('ProductoperationService', () => {
  let service: ProductoperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
