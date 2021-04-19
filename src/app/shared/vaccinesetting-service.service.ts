import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaccinesettingServiceService {

  constructor(private fb:FormBuilder,private http:HttpClient) { 

  }

  formModel = this.fb.group({
    VacSettingID:[''],
    DayRangOfVaccine:['',Validators.required],
    DayRangOfProject:['',Validators.required]
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
