import { Component } from '@angular/core';

import { Apollo, gql } from 'apollo-angular';
@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
})
export class PushNotificationComponent {
  noti: any;
  counter = 0;
  constructor(private apollo: Apollo) {
    this.apollo
      .subscribe({
        query: gql`
          subscription notification {
            notification {
              content
            }
          }
        `,
      })
      .subscribe((result: any) => {
        console.log(result);
        if (result.data) {
          this.noti = result.data.notification;
          this.counter = 1;
        }
      });
  }
}
