import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaccinegroupsServiceService {

  vaccineGroupList:MatTableDataSource<any>;
  constructor(private fb:FormBuilder,private http:HttpClient) { 
    this.vaccineGroupList = new MatTableDataSource();
  }

  formModel = this.fb.group({
    VaccineGroupID:[''],
    Description:['',Validators.required],
  });

  postVaccineGroup(){
    return this.http.post(environment.apiURL + '/VaccineGroups',this.formModel.value);
  }

  putVaccineGroup(){
    return this.http.put(environment.apiURL + '/VaccineGroups/' + this.formModel.value.VaccineGroupID,this.formModel.value);
  }

  getVaccineGroupList() {
    return this.http.get(environment.apiURL + '/VaccineGroups');
  }

  getVaccineGroupListByID(id:string):any{
    return this.http.get(environment.apiURL + '/VaccineGroups/' + id);
  }

  deleteVaccineGroup(id:string) {
    return this.http.delete(environment.apiURL + '/VaccineGroups/' + id);
  }
}
