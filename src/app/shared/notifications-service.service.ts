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
      let notificationlocal = localStorage.getItem('notification');
      if(notificationlocal != null){
        this.notificationCollection = JSON.parse(notificationlocal);
      }
      this.notificationCollection.push(message);
      localStorage.setItem("notification", JSON.stringify(this.notificationCollection)); 
      this.bageNotify += 1;
      this.message.next(message);
      // this.getEmployeeData();  
    });
  }

}
