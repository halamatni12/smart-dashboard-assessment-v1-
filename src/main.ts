import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { AppState } from './app/state/app.state';
import { NgZone } from '@angular/core';

bootstrapApplication(App, appConfig)
  .then((appRef) => {
    const injector = appRef.injector;
    const auth = injector.get(Auth);
    const appState = injector.get(AppState);
    const zone = injector.get(NgZone);

    onAuthStateChanged(auth, (user) => {
      zone.run(() => {
        if (user?.email) {
          console.log('✅ Logged in as:', user.email);
          appState.setUser(user.email); 
        } else {
          console.log('🚪 Logged out');
          appState.setUser(null); 
        }
      });
    });
  })
  .catch((err) => console.error(err));
