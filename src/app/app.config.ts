import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';


import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { authInterceptor } from './interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    provideClientHydration(withEventReplay()),

    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]) 
    ),

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
     
        
        onError: (err) => {
          console.error('Social Login Error:', err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
};