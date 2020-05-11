import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nocobrables',
  templateUrl: './nocobrables.component.html',
  styleUrls: ['./nocobrables.component.css']
})
export class NocobrablesComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    //this.spinner.show();
  }

}
