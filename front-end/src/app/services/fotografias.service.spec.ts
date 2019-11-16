import { TestBed } from '@angular/core/testing';

import { FotografiasService } from './fotografias.service';

describe('FotografiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FotografiasService = TestBed.get(FotografiasService);
    expect(service).toBeTruthy();
  });
});
