import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsServiceService } from './shared/notifications-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AgrimasterFarmsUI';
  showFiller = false;
  showWelcome = true;

  constructor(private router: Router,public notifyService:NotificationsServiceService){
    this.notifyService.runningNotificationService();
  }

  gotoVaccine(){
    this.router.navigate(['/vaccine']);
    this.showWelcome = false;
  }
}
