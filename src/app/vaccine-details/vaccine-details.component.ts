import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { VaccineServiceService } from '../shared/vaccine-service.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-vaccine-details',
  templateUrl: './vaccine-details.component.html',
  styleUrls: ['./vaccine-details.component.scss']
})
export class VaccineDetailsComponent implements OnInit {

  displayedColumns: string[] = ['ProjectID','VacDate','Inventory','Qty','ChickEjected','Description','StatusID','LastModify'];
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  showFiller = false;
  resultsLength = 0;
  isLoadingResults = true;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(public service:VaccineServiceService, 
    private toastr:ToastrService) { 
      this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
      this.sort = new MatSort();
    }

  ngOnInit(): void {
    let pageOpt = {
      pageSize: this.pageSize,
      pageIndex: 0,
      sortBy: "ProjectID",
      sortDirection: "asc"
    };
    this.getVaccineSchedulePage(pageOpt);
    
  }

  handlePageEvent(event:PageEvent){
    let pageOpt = {
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
      sortBy: this.sort.active,
      sortDirection: this.sort.direction
    };
    console.log(pageOpt);
    this.getVaccineSchedulePage(pageOpt);
  }

  getVaccineSchedulePage(pageOpt:any){
    this.service.getVaccineSchedulePageList(pageOpt).pipe(map((item:any)=> {
      console.log(item);
      this.service.vaccineScheduleList = new MatTableDataSource(item.data as Array<any>);
      this.resultsLength = item.resultsLength;
    })).subscribe();
  }

  resetPaging(): void{
    this.paginator.pageIndex = 0;
    let pageOpt = {
      pageSize: this.pageSize,
      pageIndex: 0,
      sortBy: this.sort.active,
      sortDirection: this.sort.direction
    };
    this.getVaccineSchedulePage(pageOpt);
  }

}
