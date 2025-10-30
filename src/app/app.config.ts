import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(HttpClientModule), 
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "smart-lifestyle-bb812",
        appId: "1:77813464479:web:3947df431b1b95642991aa",
        storageBucket: "smart-lifestyle-bb812.firebasestorage.app",
        apiKey: "AIzaSyD3qc0RU6YepmCKgoIkcUlqqi9eTnCoLq0",
        authDomain: "smart-lifestyle-bb812.firebaseapp.com",
        messagingSenderId: "77813464479",
        measurementId: "G-V1GLC57Q7T"
      })
    ),
    provideAuth(() => getAuth())
  ]
};
