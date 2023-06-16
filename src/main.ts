import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {appRoutes} from '../src/app/app-routing.module'
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));






// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(
// AppRoutingModule    ),
//   ] 
// });


// bootstrapApplication(AppComponent, {
//     providers:[
//         provideRouter(appRoutes)
//     ]

// })
//   .catch(err => console.error(err));