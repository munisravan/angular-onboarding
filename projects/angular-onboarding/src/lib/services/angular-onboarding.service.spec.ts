import { TestBed, inject } from '@angular/core/testing';

import { AngularOnboardingService } from './angular-onboarding.service';

describe('AngularOnboardingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularOnboardingService]
    });
  });

  it('should be created', inject([AngularOnboardingService], (service: AngularOnboardingService) => {
    expect(service).toBeTruthy();
  }));
});
