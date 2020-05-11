import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';
import { recobrosServices } from 'src/app/service/recobro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-ideudasinc',
  templateUrl: './ideudasinc.component.html',
  styleUrls: ['./ideudasinc.component.css']
})
export class IdeudasincComponent implements OnInit {

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private spinner: NgxSpinnerService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.spinner.show();
  }

}
