import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-excepcionados',
  templateUrl: './excepcionados.component.html',
  styleUrls: ['./excepcionados.component.css']
})
export class ExcepcionadosComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
  }

}
