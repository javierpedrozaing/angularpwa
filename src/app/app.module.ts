import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatButton, MatOption, MatSelect, MatOptionModule, MatSelectModule, MatListModule, MatSnackBarModule} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { NotesService } from './services/notes.services';
import { AuthService } from './services/auth.service';
import { MessagingService } from './services/messaging.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatToolbarModule,    
    MatFormFieldModule,    
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [NotesService, AuthService, MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
