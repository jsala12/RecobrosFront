import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListaclientesexcepcionadosDataSource, ListaclientesexcepcionadosItem } from './listaclientesexcepcionados-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import * as XLSX from 'xlsx'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-listaclientesexcepcionados',
  templateUrl: './listaclientesexcepcionados.component.html',
  styleUrls: ['./listaclientesexcepcionados.component.css']
})
export class ListaclientesexcepcionadosComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListaclientesexcepcionadosItem>;
  dataSource: ListaclientesexcepcionadosDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codigoTransaccion', 'fechaRechazo', 'fechaDeuda', 'tipoCuenta',
                      'numeroCuentaRechazo', 'codigoOficinaOCeo', 'valorDeuda', 'valorPendiente',
                      'saldoCuenta', 'estadoCuenta', 'tipoIdentificacion','numeroDocumento',
                      'nombreCliente', 'detalleExcepcion', 'autorizadoPor', 'fechaExcepcion'];

  datosP=[];
  datosExcel=[];
  total: number;
  numeroFilas: number;
  fechaI: any;
  mesI: string;
  diaI: string;
  pickerInicio: string;
  pickerFin: string;
  numDocumento: string;
  oficina: string;
  codTransaccion: string;
  numCuenta: string;
  valorEntero: any;
  valor: any;
  i: number;
  valorDecimal: any;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date();
  autorizadoPor: string; 
  fechaExcepcion: string; 

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices,  private spinner: NgxSpinnerService, private alertService: AlertService) {
  }

  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.dataSource = new ListaclientesexcepcionadosDataSource();
    this.dataSource.data=  this.datosP;/*
    this.recobrosService.findClientesExcepcionados('', '', '', '', '', '').subscribe(data => {
      this.datosP=[];
      this.datosExcel=[];
      this.total= 0;
      this.numeroFilas= 0;

      if(data.length!= 0){
        this.numeroFilas= this.formatoMiles(data.length.toLocaleString('en-us'));
        for(var _i=0 ; _i<data.length; _i++){
          this.total= this.total+(data[_i])[14];
          this.datosP= [ ...this.datosP, { tipoCuenta: (data[_i])[5], numeroCuentaRechazo: (data[_i])[6], codigoTransaccion: (data[_i])[7], 
            fechaDeuda: new Date((data[_i])[12]), tipoIdentificacion: (data[_i])[8], numeroDocumento: (data[_i])[2], 
            nombreCliente: (data[_i])[0], valorDeuda: this.formatoMiles('$'+(data[_i])[13].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            valorPendiente: this.formatoMiles('$'+(data[_i])[14].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            detalleCatalogo: 'Cliente', detalleExcepcion: (data[_i])[15], codigoOficinaOCeo: (data[_i])[9], 
            nombreOficinaOCeo: (data[_i])[2], resultado: 'Exonerado'}  
          ];
          this.datosExcel= [ ...this.datosExcel, { TipoCuenta: (data[_i])[5], NumeroCuentaRechazo: (data[_i])[6], CodigoTransaccion: (data[_i])[7], 
            FechaDeuda: new Date((data[_i])[12]), TipoIdentificacion: (data[_i])[8], NumeroDocumento: (data[_i])[2], 
            NombreCliente: (data[_i])[0], ValorDeuda: (data[_i])[13], ValorPendiente: (data[_i])[14], 
            DetalleExcepcion: (data[_i])[15], CodigoOficina: (data[_i])[9], 
            NombreOficina: (data[_i])[2], ExcepcionadoPor: 'Cliente'}  
          ];
        }
      }
      this.total= this.formatoMiles('$'+this.total.toLocaleString('en-us', {minimumFractionDigits: 2}));
      this.dataSource.data=  this.datosP;    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.spinner.hide();      
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información: "+error);
      this.dataSource.data= [];
    });*/
  }

  ExportTOExcel()  {
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    /* save to file */
    XLSX.writeFile(wb, 'ConsultaClientesExcepcionadosRecobros.xlsx');
  }

  ngAfterViewInit() {
    this.spinner.hide();      
  }

  filtrarReporte(){    
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.spinner.show();
    this.dataSource = new ListaclientesexcepcionadosDataSource();

    this.pickerInicio = (<HTMLInputElement>document.getElementById("pickerInicio")).value;
    if(this.pickerInicio!=""){
      this.pickerInicio = this.formatoFecha(this.pickerInicio);
    }  
    this.pickerFin = (<HTMLInputElement>document.getElementById("pickerFin")).value;
    if(this.pickerFin!=""){
      this.pickerFin = this.formatoFecha(this.pickerFin);
    }     
    this.numDocumento = (<HTMLInputElement>document.getElementById("numDocumento")).value; 
    this.oficina = (<HTMLInputElement>document.getElementById("oficina")).value;     
    this.numCuenta = (<HTMLInputElement>document.getElementById("numCuenta")).value; 
    this.codTransaccion = (<HTMLInputElement>document.getElementById("codTransaccion")).value;

   
    this.recobrosService.findClientesExcepcionados(this.pickerInicio, this.pickerFin, this.numDocumento, this.oficina, this.numCuenta, this.codTransaccion).subscribe(data => {     
      
      this.datosP=[];
      this.datosExcel=[];
      this.dataSource.data = this.datosP;
      this.total= 0;
      this.numeroFilas= 0;
      
      if(data.length!= 0){
        this.numeroFilas= this.formatoMiles(data.length.toLocaleString('en-us'));
        for(var _i=0 ; _i<data.length; _i++){
          this.total= this.total+(data[_i])[14];
          this.autorizadoPor = (data[_i])[21] != null ? (data[_i])[21]: 'N/D'; 
          this.fechaExcepcion = (data[_i])[20] != null ? (data[_i])[20]: 'N/D';
          this.datosP= [ ...this.datosP, { tipoCuenta: (data[_i])[5], numeroCuentaRechazo: (data[_i])[6], codigoTransaccion: (data[_i])[7], 
            fechaDeuda: new Date((data[_i])[12]), tipoIdentificacion: (data[_i])[8], numeroDocumento: (data[_i])[2], 
            nombreCliente: (data[_i])[0], valorDeuda: this.formatoMiles('$'+(data[_i])[13].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            valorPendiente: this.formatoMiles('$'+(data[_i])[14].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            detalleExcepcion: (data[_i])[15], codigoOficinaOCeo: (data[_i])[9], 
            nombreOficinaOCeo: (data[_i])[2], fechaRechazo: new Date((data[_i])[17]), 
            saldoCuenta: this.formatoMiles('$'+(data[_i])[18].toLocaleString('en-us', {minimumFractionDigits: 2})), estadoCuenta: (data[_i])[19], autorizadoPor: this.autorizadoPor, fechaExcepcion: this.fechaExcepcion 
          }  
          ];
          this.datosExcel= [ ...this.datosExcel, {CodigoTransaccion: (data[_i])[7], FechaRechazo: new Date((data[_i])[17]),
            FechaDeuda: new Date((data[_i])[12]), TipoCuenta: (data[_i])[5], NumeroCuentaRechazo: (data[_i])[6],  
            CodigoOficina: (data[_i])[9], ValorDeuda: (data[_i])[13], ValorPendiente: (data[_i])[14],
            SaldoCuenta: (data[_i])[18], EstadoCuenta: (data[_i])[19],
            TipoIdentificacion: (data[_i])[8], NumeroDocumento: (data[_i])[2], NombreCliente: (data[_i])[0],  
            DetalleExcepcion: (data[_i])[15], ExcepcionadoPor: 'Cliente', AutorizadoPor: this.autorizadoPor, FechaExcepcion: this.fechaExcepcion}  
          ];
        }
      }
      this.total= this.formatoMiles('$'+this.total.toLocaleString('en-us', {minimumFractionDigits: 2}));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;      
     this.dataSource.data.push(...this.datosP);

     this.spinner.hide();

    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información: "+error);
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

  formatoMiles(numero){    
    this.valorEntero= numero.split(",");
    if(this.valorEntero.length<2){
      this.valor= this.valorEntero[0];
    }else{
      this.valor= this.valorEntero[0]+".";
      for(this.i=1; this.i< this.valorEntero.length; this.i++){
        if(this.i== this.valorEntero.length-1){
          this.valorDecimal= this.valorEntero[this.i].split(".");
          if(this.valorDecimal.length<2){
            this.valor=this.valor+this.valorDecimal[0];            
          }else{
            this.valor=this.valor+this.valorDecimal[0]+","+this.valorDecimal[1];
          }        
        }else{
          if(this.valorEntero==2){
            this.valor=this.valor+this.valorEntero[this.i];
          }else{
            this.valor=this.valor+this.valorEntero[this.i]+".";
          }        
        }
      }
    }    
    return this.valor;
  }
}
