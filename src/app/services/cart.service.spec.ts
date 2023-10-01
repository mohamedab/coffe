import { TestBed } from '@angular/core/testing';

import { CartService } from './price-calculator.service';

describe('PriceCalculatorService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
