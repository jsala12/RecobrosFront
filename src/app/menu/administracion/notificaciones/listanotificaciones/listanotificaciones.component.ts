import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListanotificacionesDataSource, ListanotificacionesItem } from './listanotificaciones-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-listanotificaciones',
  templateUrl: './listanotificaciones.component.html',
  styleUrls: ['./listanotificaciones.component.css']
})
export class ListanotificacionesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListanotificacionesItem>;
  dataSource: ListanotificacionesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'asunto', 'mensaje'];

  datosP=[];

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private alertService: AlertService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.dataSource = new ListanotificacionesDataSource();
    this.recobrosService.findAdministracionNotificacion().subscribe(data => {
      
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { nombre: (data[_i])["nombre"], asunto: (data[_i])["asunto"], 
                      mensaje: (data[_i])["cuerpo"]}  
        ];
      }
      this.dataSource.data=  this.datosP;
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de las notificaciones: "+error);
      this.dataSource.data= [];
    }); 
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  
}
