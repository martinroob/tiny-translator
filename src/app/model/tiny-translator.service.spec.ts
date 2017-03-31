import { TestBed, inject } from '@angular/core/testing';

import { TinyTranslatorService } from './tiny-translator.service';
import {BackendServiceAPI} from './backend-service-api';
import {DownloaderService} from './downloader.service';

describe('TinyTranslatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TinyTranslatorService, BackendServiceAPI, DownloaderService]
    });
  });

  it('should ...', inject([TinyTranslatorService], (service: TinyTranslatorService) => {
    expect(service).toBeTruthy();
  }));
});
