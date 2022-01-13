import { TestBed } from '@angular/core/testing';

import { GenelService } from './genel.service';

describe('GenelService', () => {
  let service: GenelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
