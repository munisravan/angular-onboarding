import { Component, AfterViewInit } from '@angular/core';
import { AngularOnboardingService } from 'angular-onboarding';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private router: Router, private aoService: AngularOnboardingService) {
    aoService.navigateSubject.subscribe(path => {
      router.navigateByUrl(path);
    });
  }

  ngAfterViewInit() {
    this.aoService.start();
  }
}
