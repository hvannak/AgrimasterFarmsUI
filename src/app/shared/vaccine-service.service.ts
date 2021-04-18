import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaccineServiceService {

  vaccineScheduleList:MatTableDataSource<any>;
  constructor(private fb:FormBuilder,private http:HttpClient) {
    this.vaccineScheduleList = new MatTableDataSource();
   }

   formModel = this.fb.group({
      VaccineID:[''],
      ProjectID:['',Validators.required],
      VacDate:['',Validators.required],
      Inventory:['',Validators.required],
      Qty:['',[Validators.required,Validators.pattern(/^\d+\.\d{2}$/)]],
      ChickEjected:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      Description:['',Validators.required],
      StatusID:['',Validators.required],
    });

    postVaccineSchedule(){
      return this.http.post(environment.apiURL + '/VaccineSchedules',this.formModel.value);
    }
  
    putVaccineSchedule(){
      return this.http.put(environment.apiURL + '/VaccineSchedules/' + this.formModel.value.VaccineID,this.formModel.value);
    }
  
    getVaccineScheduleList() {
      return this.http.get(environment.apiURL + '/VaccineSchedules');
    }
  
    getVaccineScheduleListByID(id:string):any{
      return this.http.get(environment.apiURL + '/VaccineSchedules/' + id);
    }

    getVaccineScheduleListByProjectID(){
      return this.http.get(environment.apiURL + '/VaccineSchedules/Project/' + this.formModel.value.ProjectID);
    }
  
    deleteVaccineSchedule(id:string) {
      return this.http.delete(environment.apiURL + '/VaccineSchedules/' + id);
    }
}
