import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularOnboardingModule } from 'angular-onboarding';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularOnboardingModule.forRoot({
      steps: [
        {
          id: 0,
          text: 'This is your home!',
          path: '/'
        },
        {
          id: 1,
          text: 'This is your dashboard!',
          path: '/dashboard'
        }
      ]
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
