/**
 * Created by martin on 31.03.2017.
 */
import { TestBed, async, inject } from '@angular/core/testing';

import { ActiveProjectGuard } from './active-project.guard';
import {TinyTranslatorService} from './model/tiny-translator.service';
import {BackendServiceAPI} from './model/backend-service-api';
import {Router} from '@angular/router';
import {AppModule} from './app.module';

describe('ActiveProjectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
  });

  it('should ...', inject([ActiveProjectGuard], (guard: ActiveProjectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
