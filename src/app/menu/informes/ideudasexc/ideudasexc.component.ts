import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { recobrosServices } from 'src/app/service/recobro.service';

@Component({
  selector: 'app-ideudasexc',
  templateUrl: './ideudasexc.component.html',
  styleUrls: ['./ideudasexc.component.css']
})
export class IdeudasexcComponent implements OnInit {

  constructor(public authService: AuthService, private global: Global,
    private recobrosService: recobrosServices,
    private spinner: NgxSpinnerService, private alertService: AlertService){

  }

  ngOnInit() {
    this.spinner.show();
  }

}
