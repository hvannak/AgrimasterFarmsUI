import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinceScheduleComponent } from './vaccince-schedule/vaccince-schedule.component';

const routes: Routes = [
  { path: 'vaccine', component: VaccinceScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
