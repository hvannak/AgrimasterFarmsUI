import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaccinceScheduleComponent } from './vaccince-schedule/vaccince-schedule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VaccineSettingComponent } from './vaccine-setting/vaccine-setting.component';
import { NotificationComponent } from './notification/notification.component';
import { VaccineDetailsComponent } from './vaccine-details/vaccine-details.component';
import { VaccineImageComponent } from './vaccine-image/vaccine-image.component';
import { VaccineGroupsComponent } from './vaccine-groups/vaccine-groups.component';

@NgModule({
  declarations: [
    AppComponent,
    VaccinceScheduleComponent,
    VaccineSettingComponent,
    NotificationComponent,
    VaccineDetailsComponent,
    VaccineImageComponent,
    VaccineGroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [NotificationComponent,VaccineImageComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
