import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsServiceService {
  bageNotify = 0;
  message = new Subject<String>();
  notificationCollection:any = [];
  showWelcome=true;

  constructor(private http:HttpClient) { 
    this.getActiveNotificationList().subscribe((res:any) => {
      this.notificationCollection = res;
      this.bageNotify = res.length;
    })
  }

  runningNotificationService() {
    let connection = new signalR.HubConnectionBuilder()
    .withUrl(environment.hubURL + "/alert")
    .build();

    connection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    });  
  
    connection.on("BroadcastMessage", (message) => { 
      console.log(message);
      this.notificationCollection.push(message);
      console.log(this.notificationCollection); 
      this.bageNotify += 1;
      this.message.next(message);  
    });
  }

  getActiveNotificationList() {
    return this.http.get(environment.apiURL + '/Notifications/Active');
  }

}
