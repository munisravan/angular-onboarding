import { ConfigService } from './services/config/config.service';
import { BrowserModule } from '@angular/platform-browser';
import { AngularOnboardingService } from './services/angular-onboarding.service';
import { Config } from './../interfaces';
import { NgModule } from '@angular/core';
import { StepComponent } from './components/step/step.component';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './components/overlay/overlay.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  declarations: [StepComponent, OverlayComponent],
  exports: [StepComponent, OverlayComponent]
})
export class AngularOnboardingModule {
  static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: AngularOnboardingModule,
      providers: [
        AngularOnboardingService,
        ConfigService,
        {
          provide: 'config',
          useValue: config
        }
      ]
    };
  }
}
