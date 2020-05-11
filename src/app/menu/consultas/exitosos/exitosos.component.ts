import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-exitosos',
  templateUrl: './exitosos.component.html',
  styleUrls: ['./exitosos.component.css']
})
export class ExitososComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    //this.spinner.show();
  }

}
