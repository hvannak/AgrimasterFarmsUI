import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsServiceService {

  constructor(private http:HttpClient) { }

  runningNotificationService() {
    let connection = new signalR.HubConnectionBuilder()
    .withUrl(environment.hubURL + "/alert")
    .build();

    connection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    });  
  
    connection.on("BroadcastMessage", function(message) { 
      console.log(message); 
      // this.getEmployeeData();  
    });
  }
}
