import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vaccine-image',
  templateUrl: './vaccine-image.component.html',
  styleUrls: ['./vaccine-image.component.scss']
})
export class VaccineImageComponent implements OnInit {
  imageFile:string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<VaccineImageComponent>) { }

  ngOnInit(): void {
    this.imageFile = this.data.imageFile;
    console.log(this.imageFile);
  }

}
