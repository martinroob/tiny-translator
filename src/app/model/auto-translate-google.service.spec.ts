import { TestBed, inject, async } from '@angular/core/testing';

import { AutoTranslateGoogleService } from './auto-translate-google.service';
import {APP_CONFIG, APP_CONFIG_VALUE} from '../app.config';
import {ConnectionBackend, Http, HttpModule, RequestOptions} from '@angular/http';
import {AutoTranslateDisabledReason, AutoTranslateDisabledReasonKey} from './auto-translate-service-api';

describe('AutoTranslateGoogleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [AutoTranslateGoogleService, {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE}]
    });
  });

  it('should be created', inject([AutoTranslateGoogleService], (service: AutoTranslateGoogleService) => {
    expect(service).toBeTruthy();
  }));

  it('should detect missing key', async(inject([AutoTranslateGoogleService], (service: AutoTranslateGoogleService) => {
    service.setApiKey(null);
    service.canAutoTranslate('en', 'de').subscribe((result) => {
      expect(result).toBeFalsy();
    });
    service.disabledReason('en', 'de').subscribe((result) => {
      expect(result.reason).toBe(AutoTranslateDisabledReasonKey.NO_KEY);
    });
  })));

  it('should detect invalid key', async(inject([AutoTranslateGoogleService], (service: AutoTranslateGoogleService) => {
    service.setApiKey('definitely_not_a_valid_key');
    service.canAutoTranslate('en', 'de').subscribe((result) => {
      expect(result).toBeFalsy();
    });
    service.disabledReason('en', 'de').subscribe((result) => {
      expect(result.reason).toBe(AutoTranslateDisabledReasonKey.INVALID_KEY);
    });
  })));

  it('should support en and de', async(inject([AutoTranslateGoogleService], (service: AutoTranslateGoogleService) => {
    service.canAutoTranslate('en', 'de').subscribe((result) => {
      expect(result).toBeTruthy();
    });
    service.disabledReason('en', 'de').subscribe((result) => {
      expect(result).toBeFalsy();
    });
  })));

  it('should not support fantasy language', async(inject([AutoTranslateGoogleService], (service: AutoTranslateGoogleService) => {
    service.canAutoTranslate('en', 'fantasy').subscribe((result) => {
      expect(result).toBeFalsy();
    });
    service.disabledReason('en', 'fantasy').subscribe((result) => {
      expect(result.reason).toBe(AutoTranslateDisabledReasonKey.TARGET_LANG_NOT_SUPPORTED);
    });
  })));

  it('should translate hello from english to german', async(inject([AutoTranslateGoogleService], (service: AutoTranslateGoogleService) => {
    service.translate('Hello', 'en', 'de').subscribe((translation) => {
      expect(translation).toBe('Hallo');
    });
  })));

  it('should translate multiple string at once', async(inject([AutoTranslateGoogleService], (service: AutoTranslateGoogleService) => {
    service.translateMultipleStrings(['Hello', 'world'], 'en', 'de').subscribe((translations) => {
      expect(translations[0]).toBe('Hallo');
      expect(translations[1]).toBe('Welt');
    });
  })));

  it('should return a list of languages supported', async(inject([AutoTranslateGoogleService], (service: AutoTranslateGoogleService) => {
    service.supportedLanguages('en').subscribe((list) => {
      expect(list.length).toBeGreaterThan(10);
      let index = list.findIndex((lang) => lang.language === 'en');
      expect(index).toBeGreaterThan(0);
      expect(list[index].name).toBe('English');
      index = list.findIndex((lang) => lang.language === 'de');
      expect(index).toBeGreaterThan(0);
      expect(list[index].name).toBe('German');
    });
  })));

  it('should return a list of languages supported in german too', async(inject([AutoTranslateGoogleService], (service: AutoTranslateGoogleService) => {
    service.supportedLanguages('de').subscribe((list) => {
      expect(list.length).toBeGreaterThan(10);
      let index = list.findIndex((lang) => lang.language === 'en');
      expect(index).toBeGreaterThan(0);
      expect(list[index].name).toBe('Englisch');
      index = list.findIndex((lang) => lang.language === 'de');
      expect(index).toBeGreaterThan(0);
      expect(list[index].name).toBe('Deutsch');
    });
  })));

});
