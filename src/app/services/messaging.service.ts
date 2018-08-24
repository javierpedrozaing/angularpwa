import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

// import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessagingService {

  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

//   updateToken(token) {
//     this.afAuth.authState.take(1).subscribe(user => {
//       if (!user) return;

//       const data = { [user.uid]: token }
//       this.db.object('fcmTokens/').update(data)
//     })
//   }

    // con este token podemos saber a quien y a que dispositivo enviar notificaciones
  updateToken(token) {
    this.afAuth.authState.subscribe(user => {
      if (!user) return;

      const data = { [user.uid]: token }
      this.db.object('fcmTokens/').update(data)
    })
  }

  // para que el usuario de permmisos de recibir notificaciones
  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token)
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("Message received.", payload);
      this.currentMessage.next(payload)
    });

  }
}