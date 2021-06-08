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
import { ExcelServiceService } from '../shared/excel-service.service';
import { Workbook } from 'exceljs';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vaccine-details',
  templateUrl: './vaccine-details.component.html',
  styleUrls: ['./vaccine-details.component.scss']
})
export class VaccineDetailsComponent implements OnInit {

  displayedColumns: string[] = ['ProjectID','VacDate','Inventory','Qty','ChickEjected','Description','StatusID','View'];
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  showFiller = false;
  resultsLength = 0;
  isLoadingResults = true;
  pageSize = 100;
  pageSizeOptions: number[] = [100,200,500];
  projectID = new FormControl('', Validators.required);

  constructor(public service:VaccineServiceService, public serviceExcel:ExcelServiceService,
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

  exportExcelFile(){
    if(this.projectID.value){
      const title = 'Vaccine Of Project ' + this.projectID.value;
      const header = ["No","ProjectID","VacDate","Inventory","Qty","Ejected Number","Description","Status"];
      const sheetname = "Vaccine";
      const filename = "vaccine";
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet(sheetname);
      worksheet.pageSetup.orientation = 'portrait';
      let titleRow = worksheet.addRow([title]);
      worksheet.addRow([]);
      let headerRow = worksheet.addRow(header);
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF00' },
          bgColor: { argb: 'FF0000FF' }
        }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      });

      let rownumber: number = 0;
      let totalSalaryAmount:number = 0;
      // let sortDataList = this.service.vaccineScheduleList.sortData(this.service.vaccineScheduleList.filteredData,this.service.vaccineScheduleList.sort);
      this.service.vaccineScheduleList.data.forEach(element => {
        rownumber = rownumber + 1;
        let status = (element.StatusID == 0) ? 'Active' : 'Done';
        let proDate = formatDate(element.VacDate, environment.format, environment.locale); 
        let row = worksheet.addRow([rownumber, element.ProjectID, proDate, element.Inventory,
          element.Qty, element.ChickEjected, element.Description,status]);
        row.eachCell((cell,number) => {
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        });
      });

      worksheet.getColumn(1).width = 5;
      worksheet.getColumn(2).width = 20;
      worksheet.getColumn(3).width = 20;
      worksheet.getColumn(4).width = 20;
      worksheet.getColumn(5).width = 10;
      worksheet.getColumn(6).width = 10;
      worksheet.getColumn(7).width = 20;
      worksheet.getColumn(8).width = 10;
      //Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        this.serviceExcel.saveAsExcelFile(blob, filename)
      })
    }
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
      data: {imageFile: row.ImageFile }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let resultget = result;
    });
  }

}
