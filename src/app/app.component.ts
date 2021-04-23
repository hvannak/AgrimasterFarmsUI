import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuItem, MatMenuTrigger, MAT_MENU_PANEL } from '@angular/material/menu';
import { Router } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { NotificationsServiceService } from './shared/notifications-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AgrimasterFarmsUI';
  showFiller = false;
  // showWelcome = true;

  constructor(private router: Router,public notifyService:NotificationsServiceService,public dialog: MatDialog){
    this.notifyService.runningNotificationService();

  }

  gotoVaccine(){
    this.router.navigate(['/vaccine']);
    this.notifyService.showWelcome = false;
  }

  gotoVaccineSetting(){
    this.router.navigate(['/vaccinesetting']);
    this.notifyService.showWelcome = false;
  }

  gotoVaccineDetails(){
    this.router.navigate(['/vaccinedetails']);
    this.notifyService.showWelcome = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: 'auto',
      data: {name: 'popup', animal: 'test' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let resultget = result;
    });
  }
}
