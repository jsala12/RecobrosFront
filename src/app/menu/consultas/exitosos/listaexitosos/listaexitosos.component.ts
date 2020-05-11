import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListaexitososDataSource, ListaexitososItem } from './listaexitosos-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import * as XLSX from 'xlsx'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-listaexitosos',
  templateUrl: './listaexitosos.component.html',
  styleUrls: ['./listaexitosos.component.css']
})
export class ListaexitososComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListaexitososItem>;
  dataSource: ListaexitososDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codigoTransaccion', 'fechaTransaccion', 'tipoCuentaRechazo', 'numeroCuentaRechazo', 
                      'oficinaRechazo', 'fechaRecobro', 'valorCobrado', 'tipoCuentaCobro', 
                      'numeroCuentaCobro', 'oficinaCobro', 'resultado', 'saldoCuentaCobro', 
                      'estadoCuentaCobro', 'saldoCuentaRechazo', 'estadoCuentaRechazo',
                      'tipoIdentificacion','numeroDocumento', 'nombreCliente', 'descripcion'];

  datosP=[];
  datosExcel=[];
  valorCobrado: number;
  total: number;
  numeroFilas: number;
  fechaI: any;
  mesI: string;
  diaI: string;
  pickerInicio: string;
  pickerFin: string;
  numDocumento: string;
  oficina: string;
  numCuenta: string;
  codTransaccion: string;
  pickerCInicio: string;
  pickerCFin: string;
  valorEntero: any;
  valor: any;
  valorDecimal: any;
  i: any;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date();

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private spinner: NgxSpinnerService, private alertService: AlertService) {
  }


  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.dataSource = new ListaexitososDataSource();
    this.dataSource.data=  this.datosP;
    /*this.recobrosService.findExitosos('', '', '', '', '', '', '', '').subscribe(data => {
      this.total= 0;
      this.numeroFilas= 0;

      if(data.length!= 0){
        this.total= this.formatoMiles('$'+(data[0])[24].toLocaleString('en-us', {minimumFractionDigits: 2}));
        this.numeroFilas= this.formatoMiles((data[0])[25].toLocaleString('en-us'));
  
        for(var _i=0 ; _i<data.length; _i++){
          this.valorCobrado =  (data[_i])[7] - (data[_i])[9]; //Verificar, no coincide con el valor cobrado en pruebas.
          this.datosP= [ ...this.datosP, { tipoCuentaCobro: (data[_i])[0], numeroCuentaCobro: (data[_i])[2], codigoTransaccion: (data[_i])[4], 
            fechaTransaccion: new Date((data[_i])[6]), tipoIdentificacion: (data[_i])[10], numeroDocumento: (data[_i])[12], 
            nombreCliente: (data[_i])[13], valorDeuda: this.formatoMiles('$'+(data[_i])[7].toLocaleString('en-us', {minimumFractionDigits: 2})), codigoOficinaOCeo: (data[_i])[19], 
            nombreOficinaOCeo: (data[_i])[21], resultado: (data[_i])[8], valorCobrado: this.formatoMiles('$'+this.valorCobrado.toLocaleString('en-us', {minimumFractionDigits: 2})), valorPendiente: this.formatoMiles('$'+(data[_i])[9].toLocaleString('en-us', {minimumFractionDigits: 2})), fechaRecobro: new Date((data[_i])[14])}  
        ];
        }
      }
      this.dataSource.data=  this.datosP;            
    }, error => { 
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
    XLSX.writeFile(wb, 'ConsultaExitososRecobros.xlsx');
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.spinner.hide();
  }

  filtrarReporte(){  
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//  
    this.spinner.show();
    this.dataSource = new ListaexitososDataSource();;

    this.pickerInicio = (<HTMLInputElement>document.getElementById("pickerInicio")).value;
    if(this.pickerInicio){
      this.pickerInicio = this.formatoFecha(this.pickerInicio);
    }    
    this.pickerFin = (<HTMLInputElement>document.getElementById("pickerFin")).value;
    if(this.pickerFin){
      this.pickerFin = this.formatoFecha(this.pickerFin);
    }   
    this.pickerCInicio = (<HTMLInputElement>document.getElementById("pickerCInicio")).value;
    if(this.pickerCInicio){
      this.pickerCInicio = this.formatoFecha(this.pickerCInicio);
    } 
    this.pickerCFin = (<HTMLInputElement>document.getElementById("pickerCFin")).value;
    if(this.pickerCFin){
      this.pickerCFin = this.formatoFecha(this.pickerCFin);
    } 
    this.numDocumento = (<HTMLInputElement>document.getElementById("numDocumento")).value; 
    this.oficina = (<HTMLInputElement>document.getElementById("oficina")).value;     
    this.numCuenta = (<HTMLInputElement>document.getElementById("numCuenta")).value; 
    this.codTransaccion = (<HTMLInputElement>document.getElementById("codTransaccion")).value;
       
    this.recobrosService.findExitosos(this.pickerInicio, this.pickerFin, this.numDocumento, this.oficina, this.numCuenta, this.codTransaccion, this.pickerCInicio, this.pickerCFin).subscribe(data => {     
      
      this.datosP=[];
      this.datosExcel=[];
      this.dataSource.data = this.datosP;
      this.total= 0;
      this.numeroFilas= data.length;
      
      if(data.length!= 0){   
        
        for(var _i=0 ; _i<data.length; _i++){
          this.valorCobrado = (data[_i])[19]; 
          this.total= this.total+this.valorCobrado;
          this.datosP= [ ...this.datosP, { tipoCuentaCobro: (data[_i])[9], numeroCuentaCobro: (data[_i])[10], codigoTransaccion: (data[_i])[15], 
            fechaTransaccion: new Date((data[_i])[16]), tipoIdentificacion: (data[_i])[0], numeroDocumento: (data[_i])[1], 
            nombreCliente: (data[_i])[2], valorDeuda: this.formatoMiles('$'+(data[_i])[18].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            oficinaRechazo: (data[_i])[7], nombreOficinaOCeo: (data[_i])[8], resultado: 1, 
            valorCobrado: this.formatoMiles('$'+this.valorCobrado.toLocaleString('en-us', {minimumFractionDigits: 2})), 
            valorPendiente: this.formatoMiles('$'+(data[_i])[20].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            fechaRecobro: new Date((data[_i])[17]), tipoCuentaRechazo: (data[_i])[3], numeroCuentaRechazo: (data[_i])[4], oficinaCobro: (data[_i])[13], 
            saldoCuentaCobro: this.formatoMiles('$'+(data[_i])[11].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            estadoCuentaCobro: (data[_i])[12], estadoCuentaRechazo: (data[_i])[6],
            saldoCuentaRechazo: this.formatoMiles('$'+(data[_i])[5].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            descripcion: (data[_i])[21] }  
          ];
          this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[15], FechaRechazo: new Date((data[_i])[16]), TipoCuentaRechazo: (data[_i])[3],
            NumeroCuentaRechazo: (data[_i])[4], OficinaRechazo: (data[_i])[7], FechaRecobro: new Date((data[_i])[17]), ValorCobrado: this.valorCobrado,
            TipoCuentaCobro: (data[_i])[9], NumeroCuentaCobro: (data[_i])[10], OficinaCobro: (data[_i])[13], EstadoCobro: 'Exitoso', 
            SaldoCuentaCobro: (data[_i])[11], EstadoCuentaCobro: (data[_i])[12], SaldoCuentaRechazo: (data[_i])[5], EstadoCuentaRechazo: (data[_i])[6],
            TipoIdentificacion: (data[_i])[0], NumeroDocumento: (data[_i])[1], NombreCliente: (data[_i])[2], Descripcion: (data[_i])[21]}  
          ];
        }
    }
      this.total= this.formatoMiles('$'+this.total.toLocaleString('en-us', {minimumFractionDigits: 2}));
      this.numeroFilas= this.formatoMiles(this.numeroFilas.toLocaleString('en-us'));
      this.dataSource.sort = this.sort;
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;      
     this.dataSource.data.push(...this.datosP);

     this.spinner.hide();

    }, error => { 
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
