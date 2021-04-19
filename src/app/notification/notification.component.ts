import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsServiceService } from '../shared/notifications-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<NotificationComponent>,private router: Router,
  public notifyService:NotificationsServiceService ) { }
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  notificationList:any[] = [];

  ngOnInit(): void {
    let notificationCollection = localStorage.getItem('notification');
    if(notificationCollection != null){
      this.notificationList = JSON.parse(notificationCollection);
    }
  }

  gotoVaccine(){
    this.router.navigate(['/vaccine']);
    this.notifyService.showWelcome = false;
    this.dialogRef.close();
  }

}
