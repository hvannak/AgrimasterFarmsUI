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

  displayedColumns: string[] = ['Inventory','DayRangOfVaccine','DayRangOfProject'];
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service:VaccinesettingServiceService, 
    private toastr:ToastrService) {
      this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
      this.sort = new MatSort();
     }

  ngOnInit(): void {
    this.service.formModel.patchValue({
      VacSettingID: '0'
    });
    this.service.getVaccineSettingList().subscribe(res => {
      if(res){
        this.service.vaccineSettingList = new MatTableDataSource(res as Array<any>);
        this.service.vaccineSettingList.paginator = this.paginator;
        this.service.vaccineSettingList.sort = this.sort;
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
          this.service.vaccineSettingList.data.push(res);
          this.service.vaccineSettingList._updateChangeSubscription();   
          this.service.formModel.reset();
          this.service.formModel.patchValue({
            VacSettingID: '0'
          });     
          this.toastr.success("New Vaccine Setting created","Register Vaccine Setting");
      },
      err =>{
        console.log(err);
      });
  }

  putVaccineSetting(){
    this.service.putVaccineSetting().subscribe(
      (res:any) => {
        console.log(res);
        let index = this.service.vaccineSettingList.data.findIndex(x=>x.VacSettingID == this.service.formModel.value.VacSettingID);
        this.service.vaccineSettingList.data[index] = res;
        this.service.vaccineSettingList._updateChangeSubscription();   
        this.service.formModel.reset();
        this.service.formModel.patchValue({
          VacSettingID: '0'
        });   
        this.toastr.success("New Vaccine Setting updated","Register Vaccine Setting");
      },
      err =>{
        console.log(err);
      }

    );
  }

  openForEdit(item:any) {
    this.service.formModel.setValue({
      VacSettingID:item.VacSettingID,
      Inventory:item.Inventory,
      DayRangOfVaccine: item.DayRangOfVaccine,
      DayRangOfProject: item.DayRangOfProject
    });
  }

}
