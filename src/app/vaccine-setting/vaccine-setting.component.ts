import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { VaccinesettingServiceService } from '../shared/vaccinesetting-service.service';

@Component({
  selector: 'app-vaccine-setting',
  templateUrl: './vaccine-setting.component.html',
  styleUrls: ['./vaccine-setting.component.scss']
})
export class VaccineSettingComponent implements OnInit {

  constructor(public service:VaccinesettingServiceService, 
    private toastr:ToastrService) {

     }

  ngOnInit(): void {
    this.service.formModel.patchValue({
      VacSettingID: '0'
    });
    this.service.getVaccineSettingList().subscribe(res => {
      if(res){
        this.service.formModel.setValue(res);
      }
    });
  }

  onSubmit()
  {
    if(this.service.formModel.value.VacSettingID == '0'){
      this.postVaccineSetting();
    }
    else{
      this.putVaccineSetting();
    }
  }
  postVaccineSetting(){
    this.service.postVaccineSetting().subscribe(
      (res:any) => {         
          this.toastr.success("New Vaccine Setting created","Register Vaccine Setting");
      },
      err =>{
        console.log(err);
      });
  }

  putVaccineSetting(){
    this.service.putVaccineSetting().subscribe(
      (res:any) => {   
        this.toastr.success("New Vaccine Setting updated","Register Vaccine Setting");
      },
      err =>{
        console.log(err);
      }

    );
  }

}
