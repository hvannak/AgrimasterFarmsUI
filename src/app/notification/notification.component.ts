import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationsServiceService } from '../shared/notifications-service.service';
import { VaccineServiceService } from '../shared/vaccine-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<NotificationComponent>,private router: Router,
  public notifyService:NotificationsServiceService,public vacService:VaccineServiceService ) { }
  notificationList:any[] = [];

  ngOnInit(): void {
    // let notificationCollection = localStorage.getItem('notification');
    // if(notificationCollection != null){
    //   this.notificationList = JSON.parse(notificationCollection);
    // }
    this.notificationList = this.notifyService.notificationCollection;
    console.log(this.notificationList);
  }

  gotoVaccine(item:any){
    this.router.navigate(['/vaccine']);
    this.notifyService.showWelcome = false;
    if(item.DateVacc){
      let proDate = formatDate(item.DateVacc, environment.format, environment.locale);
      this.vacService.getVaccineScheduleListByNotificaton(item.ProjectID,proDate).subscribe((res:any) => {
        this.vacService.formModel.patchValue({
          VaccineID:res.VaccineID,
          ProjectID:res.ProjectID,
          VaccineGroupID: res.VaccineGroupID,
          VacDate: res.VacDate,
          Inventory: res.Inventory,
          Qty: res.Qty,
          ChickEjected: res.ChickEjected,
          Description: res.Description,
          StatusID: res.StatusID == 0 ? "0" : "1"
        });
      })
    }
    // let index = this.notificationList.findIndex(x=>x.ProjectID == item.ProjectID && x.DateVacc == item.DateVacc);
    // this.notificationList.splice(index,1);
    // localStorage.setItem("notification", JSON.stringify(this.notificationList)); 
    this.dialogRef.close();
  }

}
