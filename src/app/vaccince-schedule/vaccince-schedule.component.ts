import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { VaccineServiceService } from '../shared/vaccine-service.service';

@Component({
  selector: 'app-vaccince-schedule',
  templateUrl: './vaccince-schedule.component.html',
  styleUrls: ['./vaccince-schedule.component.scss']
})
export class VaccinceScheduleComponent implements OnInit {

  displayedColumns: string[] = ['ProjectID','VacDate','Description','StatusID'];
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  showFiller = false;

  constructor(public service:VaccineServiceService, 
    private toastr:ToastrService) {
      this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
      this.sort = new MatSort();
     }

  ngOnInit(): void {
    this.service.formModel.patchValue({
      VaccineID: '0'
    });
    this.service.getVaccineScheduleList().subscribe(res => {
      console.log(res);
      this.service.vaccineScheduleList = new MatTableDataSource(res as Array<any>);
      this.service.vaccineScheduleList.paginator = this.paginator;
      this.service.vaccineScheduleList.sort = this.sort;
    });
  }

  onSubmit()
  {
    console.log(this.service.formModel.value.VaccineID);
    if(this.service.formModel.value.VaccineID == '0'){
      this.postVaccineSchedule();
    }
    else{
      this.putVaccineSchedule();
    }
  }
  postVaccineSchedule(){
    console.log(this.service.formModel.value);
    this.service.postVaccineSchedule().subscribe(
      (res:any) => {         
          this.service.vaccineScheduleList.data.push(res);
          this.service.vaccineScheduleList._updateChangeSubscription();   
          this.service.formModel.reset();
          this.service.formModel.patchValue({
            VaccineID: '0'
          });
          this.toastr.success("New Vaccine Schedule created","Register Vaccine Schedule");
      },
      err =>{
        console.log(err);
      });
  }
  putVaccineSchedule(){
    this.service.putVaccineSchedule().subscribe(
      (res:any) => {   
        console.log(res);
        let index = this.service.vaccineScheduleList.data.findIndex(x=>x.VaccineID == this.service.formModel.value.VaccineID);
        this.service.vaccineScheduleList.data[index] = res;
        this.service.vaccineScheduleList._updateChangeSubscription();   
        this.service.formModel.reset();
        this.service.formModel.patchValue({
          VaccineID: '0'
        });
        this.toastr.success("New Vaccine Schedule updated","Register Vaccine Schedule");
      },
      err =>{
        console.log(err);
      }

    );
  }
  openForEdit(item:any) {
    console.log(item.StatusID);
    this.service.formModel.setValue({
      VaccineID:item.VaccineID,
      ProjectID:item.ProjectID,
      VacDate: item.VacDate,
      Inventory: item.Inventory,
      Qty: item.Qty,
      ChickEjected: item.ChickEjected,
      Description: item.Description,
      StatusID: item.StatusID == 0 ? "0" : "1"
    });
  }

  onDeleteVaccineSchedule() {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteVaccineSchedule().subscribe(res => {
        this.service.vaccineScheduleList.data = [];
        this.service.vaccineScheduleList._updateChangeSubscription();
        this.toastr.warning("Deleted Successfully", "Vaccine Schedule");
      });
    }
  }

  resetForm(){
    this.service.formModel.reset();
  }

  getProjectVacSchedule(){
    this.service.getVaccineScheduleListByProjectID().subscribe(res => {
      this.service.vaccineScheduleList = new MatTableDataSource(res as Array<any>);
      this.service.vaccineScheduleList.paginator = this.paginator;
      this.service.vaccineScheduleList.sort = this.sort;
    });
  }

  generateProjectVacSchedule(){
    if(this.service.formModel.value.ProjectID  && this.service.formModel.value.VacDate){
      this.service.getProjectGenerateVaccineSchedule().subscribe(res => {
        this.service.vaccineScheduleList = new MatTableDataSource(res as Array<any>);
        this.service.vaccineScheduleList.paginator = this.paginator;
        this.service.vaccineScheduleList.sort = this.sort;
        this.toastr.success("New Vaccine Schedule has been generated","Register Vaccine Schedule");
      })
    }
    else{
      this.toastr.warning("Please enter ProjectID and Project Date.","Register Vaccine Schedule");
    }
  }

}
