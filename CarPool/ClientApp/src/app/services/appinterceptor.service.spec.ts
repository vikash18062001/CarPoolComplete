import { TestBed } from '@angular/core/testing';

import { AppinterceptorService } from './appinterceptor.service';

describe('AppinterceptorService', () => {
  let service: AppinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
