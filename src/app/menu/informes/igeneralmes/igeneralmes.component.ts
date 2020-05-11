import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-igeneralmes',
  templateUrl: './igeneralmes.component.html',
  styleUrls: ['./igeneralmes.component.css']
})
export class IgeneralmesComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }
  
    ngOnInit() {
      //this.spinner.show();
    }

}
