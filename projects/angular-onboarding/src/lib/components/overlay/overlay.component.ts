import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { AngularOnboardingService } from '../../services/angular-onboarding.service';

@Component({
  selector: 'ao-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
  animations: [
    trigger('overlayState', [
      state(
        'visible',
        style({
          opacity: 1,
          display: 'block'
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          display: 'none'
        })
      ),
      transition('* <=> *', animate(500))
    ])
  ]
})
export class OverlayComponent implements OnInit {
  public loaded = false;
  public state = 'hidden';

  constructor(private aoService: AngularOnboardingService) {}

  ngOnInit() {
    this.aoService.showOverlaySubject.subscribe(show => {
      if (show) {
        this.state = 'visible';
      } else {
        this.state = 'hidden';
      }
    });
    setTimeout(() => {
      this.loaded = true;
    }, 500);
  }
}
