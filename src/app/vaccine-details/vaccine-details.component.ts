import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { VaccineServiceService } from '../shared/vaccine-service.service';
import {map} from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { VaccineImageComponent } from '../vaccine-image/vaccine-image.component';

@Component({
  selector: 'app-vaccine-details',
  templateUrl: './vaccine-details.component.html',
  styleUrls: ['./vaccine-details.component.scss']
})
export class VaccineDetailsComponent implements OnInit {

  displayedColumns: string[] = ['ProjectID','VacDate','Inventory','Qty','ChickEjected','Description','StatusID','LastModify','View'];
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  showFiller = false;
  resultsLength = 0;
  isLoadingResults = true;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  projectID = new FormControl('', Validators.required);

  constructor(public service:VaccineServiceService, 
    private toastr:ToastrService,public dialog: MatDialog) { 
      this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
      this.sort = new MatSort();
    }

  ngOnInit(): void {
    let pageOpt = {
      pageSize: this.pageSize,
      pageIndex: 0,
      sortBy: "ProjectID",
      sortDirection: "asc",
      projectID:""
    };
    this.getVaccineSchedulePage(pageOpt);
    
  }

  handlePageEvent(event:PageEvent){
    let pageOpt = {
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
      sortBy: this.sort.active,
      sortDirection: this.sort.direction,
      projectID:this.projectID.value
    };
    console.log(pageOpt);
    this.getVaccineSchedulePage(pageOpt);
  }

  getVaccineSchedulePage(pageOpt:any){
    this.isLoadingResults = true;
    this.service.getVaccineSchedulePageList(pageOpt).pipe(map((item:any)=> {
      console.log(item);
      this.service.vaccineScheduleList = new MatTableDataSource(item.data as Array<any>);
      this.resultsLength = item.resultsLength;
      this.isLoadingResults = false;
    })).subscribe();
  }

  resetPaging(): void{
    this.paginator.pageIndex = 0;
    let pageOpt = {
      pageSize: this.pageSize,
      pageIndex: 0,
      sortBy: this.sort.active,
      sortDirection: this.sort.direction,
      projectID:this.projectID.value
    };
    this.getVaccineSchedulePage(pageOpt);
  }

  getErrorMessage() {
    if (this.projectID.hasError('required')) {
      return 'You must enter a value';
    }
    return "";
  }

  viewImage(row:any){
    const dialogRef = this.dialog.open(VaccineImageComponent, {
      width: 'auto',
      data: {imageFile: row.imageFile }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let resultget = result;
    });
  }

}
