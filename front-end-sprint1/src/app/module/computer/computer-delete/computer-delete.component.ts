import {Component, Inject, OnInit} from '@angular/core';
import {ComputerService} from "../../../service/computer/computer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-computer-delete',
  templateUrl: './computer-delete.component.html',
  styleUrls: ['./computer-delete.component.css']
})
export class ComputerDeleteComponent implements OnInit {

  constructor(private computerService: ComputerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public dialog: MatDialogRef<ComputerDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  delete() {
    this.computerService.delete(this.data.idComputer).subscribe(() => {
      this.dialog.close(true);
      /*this.router.navigateByUrl('');*/
      this.toastrService.info('Delete Success!!!');
    });
  }
}
