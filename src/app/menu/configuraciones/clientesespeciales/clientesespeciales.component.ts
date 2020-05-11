import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-clientesespeciales',
  templateUrl: './clientesespeciales.component.html',
  styleUrls: ['./clientesespeciales.component.css']
})
export class ClientesespecialesComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
}
