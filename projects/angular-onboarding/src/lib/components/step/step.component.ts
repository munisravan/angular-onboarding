import { Location } from './../../classes/location';
import { AngularOnboardingService } from './../../services/angular-onboarding.service';
import {
  Component,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'ao-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],
  animations: [
    trigger('visibilityState', [
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
export class StepComponent implements OnInit {
  public text: string;
  public loaded = false;
  public state = 'hidden';
  public nextDisabled = false;
  public previousDisabled = false;
  public position: string[] = ['0px', '0px'];

  private oldZ: string;

  @Input() id: number;
  @Input() location: string;
  @Input() element: HTMLHtmlElement;

  @ViewChild('box') box: ElementRef;

  @HostListener('window:resize')
  onResize() {
    this.updatePosition();
  }

  constructor(
    private aoService: AngularOnboardingService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.loadStepData();
    this.aoService.goToStepSubject.subscribe(stepId => {
      if (stepId === Number(this.id)) {
        this.updatePosition();
        this.state = 'visible';
        this.oldZ = this.element.style.zIndex;
        this.element.style.zIndex = '16777271';
        if (this.element.style.position.length === 0) {
          this.element.style.position = 'relative';
        }
      } else {
        this.state = 'hidden';
        this.element.style.zIndex = this.oldZ;
      }
    });
    setTimeout(() => {
      this.loaded = true;
    }, 500);
    this.previousDisabled = this.isFirstStep();
    this.nextDisabled = this.isLastStep();
  }

  /*
    Step navigation methods
  */
  previous() {
    this.aoService.previousStep();
    this.previousDisabled = true;
    setTimeout(() => {
      this.previousDisabled = false;
    }, 250);
  }

  next() {
    this.aoService.nextStep();
    this.nextDisabled = true;
    setTimeout(() => {
      this.nextDisabled = false;
    }, 250);
  }

  finish() {
    this.aoService.exit();
    this.configService.updateData({
      enabled: false,
      step: 0
    });
  }

  exit() {
    this.aoService.exit();
  }

  /*
    Step data methods
  */
  loadStepData() {
    const step = this.aoService.getStep(Number(this.id));
    this.text = step.text;
  }

  /*
    Step utility methods
  */
  updatePosition() {
    if (this.box) {
      let positionMethod;
      switch (this.location) {
        case 'above':
          positionMethod = Location.centerAbove;
          break;
        case 'below':
          positionMethod = Location.centerBelow;
          break;
        case 'left':
          positionMethod = Location.centerLeft;
          break;
        case 'right':
          positionMethod = Location.centerRight;
          break;
      }
      setTimeout(_ => {
        this.position = positionMethod(
          this.element,
          this.box.nativeElement,
          this.configService.config.padding
        );
      });
    } else {
      setTimeout(() => {
        this.updatePosition();
      }, 200);
    }
  }

  /*
    Step location methods
  */
  isFirstStep(): boolean {
    return Number(this.id) === 0;
  }

  isLastStep(): boolean {
    return Number(this.id) === this.aoService.getStepRange()[1] - 1;
  }
}
