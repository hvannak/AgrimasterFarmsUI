import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { VaccinegroupsServiceService } from '../shared/vaccinegroups-service.service';

@Component({
  selector: 'app-vaccine-groups',
  templateUrl: './vaccine-groups.component.html',
  styleUrls: ['./vaccine-groups.component.scss']
})
export class VaccineGroupsComponent implements OnInit {

  displayedColumns: string[] = ['Description','Delete'];
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  constructor(public service:VaccinegroupsServiceService, 
    private toastr:ToastrService) {
      this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
      this.sort = new MatSort();
     }

  ngOnInit(): void {
    this.service.formModel.patchValue({
      VaccineGroupID: '0'
    });
    this.service.getVaccineGroupList().subscribe(res => {
      if(res){
        this.service.vaccineGroupList = new MatTableDataSource(res as Array<any>);
        this.service.vaccineGroupList.paginator = this.paginator;
        this.service.vaccineGroupList.sort = this.sort;
      }
    });
  }

  onSubmit()
  {
    if(this.service.formModel.value.VaccineGroupID == '0'){
      this.postVaccineSetting();
    }
    else{
      this.putVaccineSetting();
    }
  }
  postVaccineSetting(){
    this.service.postVaccineGroup().subscribe(
      (res:any) => {    
          this.service.vaccineGroupList.data.push(res);
          this.service.vaccineGroupList._updateChangeSubscription();   
          this.service.formModel.reset();
          this.service.formModel.patchValue({
            VaccineGroupID: '0'
          });     
          this.toastr.success("New Vaccine Group created","Register Vaccine Group");
      },
      err =>{
        console.log(err);
      });
  }

  putVaccineSetting(){
    this.service.putVaccineGroup().subscribe(
      (res:any) => {
        console.log(res);
        let index = this.service.vaccineGroupList.data.findIndex(x=>x.VaccineGroupID == this.service.formModel.value.VaccineGroupID);
        this.service.vaccineGroupList.data[index] = res;
        this.service.vaccineGroupList._updateChangeSubscription();   
        this.service.formModel.reset();
        this.service.formModel.patchValue({
          VaccineGroupID: '0'
        });   
        this.toastr.success("New Vaccine Group updated","Register Vaccine Group");
      },
      err =>{
        console.log(err);
      }

    );
  }

  openForEdit(item:any) {
    this.service.formModel.setValue({
      VaccineGroupID:item.VaccineGroupID,
      Description:item.Description,
    });
  }

  deleteRow(item:any){
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteVaccineGroup(item.VaccineGroupID).subscribe(res => {
        let index = this.service.vaccineGroupList.data.findIndex(x=>x.VaccineGroupID == item.VaccineGroupID);
        this.service.vaccineGroupList.data.splice(index,1);
        this.service.vaccineGroupList._updateChangeSubscription();
      });
    }
  }

}
