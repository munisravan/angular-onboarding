# angular-onboarding
## Getting Started
1. `npm i --save-dev angular-onboarding`
2. Edit your module file to import `AngularOnboardingModule` and pass a config
```typescript
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

```
3. Edit your app component file to include `<ao-overlay></ao-overlay>`
4. Add `ao-step` to every component file with a element you want to showcase.
```html
<button #logoutButton>Logout</button>
<ao-step id="0" [element]="logoutButton" location="above"></ao-step>
```
5. Define a function to handel the routing it will be passed a path as a string.
6. Import `AngularOnboardingSerivce` and call `start()` with the routing handler!
```typescript
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
```
## Docs

### Components
#### Overlay `<ao-overlay></ao-overlay>`
Essential for functionality of the library, adds the backdrop.

#### Step `<ao-step></ao-step>`
Element correlating to the steps passed to the library. 

It should be placed in the component that has the reference element in it.
| Attribute | Type        | Optional |
| --------- | ----------- | -------- |
| id        | number      | no       |
| element   | HTMLElement | no       |
| location  | string      | no       |

### Services
#### AngularOnboardingService

| Method       | Description                                 |
| ------------ | ------------------------------------------- |
| start()      | Starts / resumes the tutorial.              |
| isFinished() | Returns if the user finished the onboarding |
| reset()      | Resets all tutorial data.                   |

### Interfaces

#### Step
| Property | Type   | Optional | Extra                                      |
| -------- | ------ | -------- | ------------------------------------------ |
| id       | number | no       |                                            |
| text     | string | no       |                                            |
| route    | string | yes      | The route that the step will be located on |

#### Config
| Property  | Type   | Optional |
| --------- | ------ | -------- |
| steps     | Step[] | no       |
| padding   | number | yes      |

#### AOStorage
| Property | Type    | Optional |
| -------- | ------- | -------- |
| step     | number  | no       |
| enabled  | boolean | no       |
