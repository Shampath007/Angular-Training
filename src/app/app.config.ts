import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideHttpClient } from '@angular/common/http';
import { CustomPreloadingStrategy } from './custom-preloading';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    {provide:CustomPreloadingStrategy,useClass:CustomPreloadingStrategy},
    provideRouter(routes, withPreloading(CustomPreloadingStrategy)), 
     provideAnimationsAsync(),
     provideNativeDateAdapter(),
     provideHttpClient()]
};
