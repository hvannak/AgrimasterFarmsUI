import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaccinesettingServiceService {

  vaccineSettingList:MatTableDataSource<any>;
  constructor(private fb:FormBuilder,private http:HttpClient) { 
    this.vaccineSettingList = new MatTableDataSource();
  }

  formModel = this.fb.group({
    VacSettingID:[''],
    VaccineGroupID:['',Validators.required],
    Inventory:['',Validators.required],
    DayRang:['',Validators.required],
  });

  postVaccineSetting(){
    return this.http.post(environment.apiURL + '/VaccineSettings',this.formModel.value);
  }

  putVaccineSetting(){
    return this.http.put(environment.apiURL + '/VaccineSettings/' + this.formModel.value.VacSettingID,this.formModel.value);
  }

  getVaccineSettingList() {
    return this.http.get(environment.apiURL + '/VaccineSettings');
  }

  getVaccineSettingListByID(id:string):any{
    return this.http.get(environment.apiURL + '/VaccineSettings/' + id);
  }

  deleteVaccineSetting(id:string) {
    return this.http.delete(environment.apiURL + '/VaccineSettings/' + id);
  }
}
