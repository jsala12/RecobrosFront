import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-igeneral',
  templateUrl: './igeneral.component.html',
  styleUrls: ['./igeneral.component.css']
})
export class IgeneralComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
  }

}
