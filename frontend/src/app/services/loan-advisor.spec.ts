import { TestBed } from '@angular/core/testing';

import { LoanAdvisor } from './loan-advisor';

describe('LoanAdvisor', () => {
  let service: LoanAdvisor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanAdvisor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
