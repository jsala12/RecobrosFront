import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-excepciones',
  templateUrl: './excepciones.component.html',
  styleUrls: ['./excepciones.component.css']
})
export class ExcepcionesComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService, private alertService: AlertService) { }

  ngOnInit() {
    this.spinner.show();
  }

}
