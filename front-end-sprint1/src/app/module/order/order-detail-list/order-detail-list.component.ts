import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderDetail} from "../../../model/order-detail/order-detail";

//huynh code
@Component({
  selector: 'app-order-detail-list',
  templateUrl: './order-detail-list.component.html',
  styleUrls: ['./order-detail-list.component.css']
})
export class OrderDetailListComponent implements OnInit {
  listOderDetail: OrderDetail[]

  constructor( public dialogRef: MatDialogRef<OrderDetailListComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit(): void {
    this.listOderDetail= this.data.oderDetailList;
    console.log(this.listOderDetail)
  }

  close(): void {
    this.dialogRef.close();
  }

}
