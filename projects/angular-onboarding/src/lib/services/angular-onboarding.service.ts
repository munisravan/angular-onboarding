import { Step, AOStorage } from './../../interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ConfigService } from './config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AngularOnboardingService {
  private _goToStepSubject = new BehaviorSubject<number>(-1);
  private _showOverlaySubject = new BehaviorSubject<boolean>(false);
  private _navigateSubject = new Subject<string>();

  public readonly goToStepSubject: Observable<number>;
  public readonly showOverlaySubject: Observable<boolean>;
  public readonly navigateSubject: Observable<string>;

  constructor(private configService: ConfigService) {
    this.goToStepSubject = this._goToStepSubject.asObservable();
    this.showOverlaySubject = this._showOverlaySubject.asObservable();
    this.navigateSubject = this._navigateSubject.asObservable();
  }

  /**
   * Start the onboarding by going to the last step in the stored data if first time will go to step 0
   *
   * @param [routingFunction] Optional if all on one route, a function to handel the routing
   * @memberof AngularOnboardingService
   */
  start() {
    const enabled = this.configService.getData().enabled;
    if (enabled) {
      const config = this.configService.getData();
      this.goToStep(config.step);
    }
  }

  /**
   * Returns if the user finished the onboarding
   *
   * @memberof AngularOnboardingService
   */
  isFinished(): boolean {
    const finsihedData: AOStorage = {
      enabled: false,
      step: 0
    };
    return this.configService.getData() === finsihedData;
  }

  /**
   * Reset the local storage data
   *
   * @memberof AngularOnboardingService
   */
  reset() {
    this.configService.updateData({
      enabled: true,
      step: 0
    });
  }

  /*
    Utility methods
  */
  getStepRange(): number[] {
    return [-1, this.configService.config.steps.length];
  }

  getStep(id: number) {
    const result = this.configService.config.steps.find((step: Step) => {
      return Number(step.id) === id;
    });
    if (result) {
      return result;
    } else {
      return null;
    }
  }

  /*
  Navigation methods
  */
  goToPath(path: string) {
    this._navigateSubject.next(path);
  }

  goToStep(id: number) {
    const range = this.getStepRange();
    const data = this.configService.getData();
    const step = this.configService.config.steps[id];
    if (range[0] < id && range[1] > id) {
      this._goToStepSubject.next(id);
      this._showOverlaySubject.next(true);
    } else {
      this._goToStepSubject.next(-1);
      this._showOverlaySubject.next(false);
    }
    if (step.path) {
      this.goToPath(step.path);
    }
    data.step = id;
    this.configService.updateData(data);
  }

  nextStep() {
    const data = this.configService.getData();
    data.step += 1;
    this.goToStep(data.step);
  }

  previousStep() {
    const data = this.configService.getData();
    data.step -= 1;
    this.goToStep(data.step);
  }

  exit() {
    this._goToStepSubject.next(-1);
    this._showOverlaySubject.next(false);
    this.configService.updateData({
      enabled: false,
      step: (-1)
    });
  }
}
