import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListalogsDataSource, ListalogsItem } from './listalogs-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-listalogs',
  templateUrl: './listalogs.component.html',
  styleUrls: ['./listalogs.component.css']
})
export class ListalogsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListalogsItem>;
  dataSource: ListalogsDataSource;

  datosP=[];
  pickerInicio: string;
  pickerFin: string;
  fechaI= [];
  mesI: string;
  diaI: string;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['usuario', 'accion', 'fecha', 'nombreMenu', 'descripcion'];

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private alertService: AlertService, private spinner: NgxSpinnerService) {
  }
  
  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.dataSource = new ListalogsDataSource();
    this.recobrosService.findAdministracionLog('', '').subscribe(data => {
      
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { usuario: (data[_i])["codigoUsuario"], accion: (data[_i])["accion"], 
                      fecha: (data[_i])["fecha"], nombreMenu:  ((data[_i])["nombreMenu"]), descripcion:  ((data[_i])["descripcion"])}  
        ];
      }
      this.dataSource.data=  this.datosP;
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de los logs: "+error);
      this.dataSource.data= [];
    }); 
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  filtrarReporte(){
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.spinner.show();
    this.dataSource = new ListalogsDataSource();
    this.pickerInicio = (<HTMLInputElement>document.getElementById("pickerInicio")).value;
    this.pickerInicio = this.formatoFecha(this.pickerInicio);
    this.pickerFin = (<HTMLInputElement>document.getElementById("pickerFin")).value;
    this.pickerFin = this.formatoFecha(this.pickerFin);
   
    this.recobrosService.findAdministracionLog(this.pickerInicio, this.pickerFin).subscribe(data => {     
      
      this.datosP=[];
      this.dataSource.data = this.datosP;
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { usuario: (data[_i])["codigoUsuario"], accion: (data[_i])["accion"], 
                      fecha: (data[_i])["fecha"], nombreMenu:  ((data[_i])["nombreMenu"]), descripcion:  ((data[_i])["descripcion"])}  
        ];
      }
      this.dataSource.sort = this.sort;
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      
      this.dataSource.data.push(...this.datosP);
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de los logs: "+error);
      this.dataSource.data= [];
    }); 
  }

  formatoFecha(pickerInicio : string): string {
    //pickerInicio =pickerInicio.replace("/","-");   
    this.fechaI= pickerInicio.split("/"); 
    
    if(this.fechaI[0]<10){
       this.mesI = "0"+this.fechaI[0] ;
    }else{
      this.mesI = this.fechaI[0] ;
    }

    if(this.fechaI[1]<10){
      this.diaI = "0"+this.fechaI[1] ;
   }else{
     this.diaI = this.fechaI[1] ;
   }
   return  this.diaI + "-" + this.mesI + "-" + this.fechaI[2];
  }
}
