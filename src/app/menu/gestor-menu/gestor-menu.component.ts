import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-gestor-menu',
  templateUrl: './gestor-menu.component.html',
  styleUrls: ['./gestor-menu.component.css']
})
export class GestorMenuComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
  }

}
