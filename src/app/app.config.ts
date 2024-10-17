import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'nahuel-borquez-pp',
        appId: '1:93038752451:web:121331a12c41054f756876',
        storageBucket: 'nahuel-borquez-pp.appspot.com',
        apiKey: 'AIzaSyD25_FQn5aFlcJpbRYVSMuG2XG20E6Mdlg',
        authDomain: 'nahuel-borquez-pp.firebaseapp.com',
        messagingSenderId: '93038752451',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    }),
  ],
};
