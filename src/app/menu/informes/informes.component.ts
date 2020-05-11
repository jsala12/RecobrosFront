import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
  }

}
