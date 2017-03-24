import { TestBed, inject } from '@angular/core/testing';

import { TinyTranslatorService } from './tiny-translator.service';

describe('TinyTranslatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TinyTranslatorService]
    });
  });

  it('should ...', inject([TinyTranslatorService], (service: TinyTranslatorService) => {
    expect(service).toBeTruthy();
  }));
});
