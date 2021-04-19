import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinceScheduleComponent } from './vaccince-schedule/vaccince-schedule.component';
import { VaccineSettingComponent } from './vaccine-setting/vaccine-setting.component';

const routes: Routes = [
  { path: 'vaccine', component: VaccinceScheduleComponent },
  { path: 'vaccinesetting', component: VaccineSettingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
