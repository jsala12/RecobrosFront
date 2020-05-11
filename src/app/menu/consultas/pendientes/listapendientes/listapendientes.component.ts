import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListapendientesDataSource, ListapendientesItem } from './listapendientes-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import * as XLSX from 'xlsx'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { Global } from 'src/app/global';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-listapendientes',
  templateUrl: './listapendientes.component.html',
  styleUrls: ['./listapendientes.component.css']
})
export class ListapendientesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListapendientesItem>;
  dataSource: ListapendientesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'codigoTransaccion', 'fechaTransaccion', 'fechaDeuda', 'tipoCuenta', 'numeroCuentaRechazo',
                       'valorDeuda', 'valorPendiente', 'codigoOficinaOCeo',  'valorCobrado',
                       'saldoCuenta', 'estadoCuenta', 'tipoIdentificacion', 'numeroDocumento',
                       'nombreCliente', 'incobrable'];

  datosP=[];
  datosExcel=[];
  valorCobrado: number;
  total: number;
  numeroFilas: number;
  pickerInicio: string;
  pickerFin: string;
  oficina: string;
  codTransaccion: string;
  numCuenta: string;
  numDocumento: string;
  fechaI: any;
  mesI: string;
  diaI: string;
  valorEntero: any;
  valor: any;
  i: number;
  valorDecimal: any;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date();
  incobrable: string; 


  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private spinner: NgxSpinnerService, private alertService: AlertService) {
  }

  ngOnInit() {  
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//  
    this.dataSource = new ListapendientesDataSource();
    this.dataSource.data=  this.datosP;
    /*
    this.recobrosService.findPendientes('', '', '', '', '', '').subscribe(data => {

      this.total=0;
      this.numeroFilas=0;
      
      this.total= this.formatoMiles('$'+(data[0])[19].toLocaleString('en-us', {minimumFractionDigits: 2}));
      this.numeroFilas= this.formatoMiles((data[0])[20].toLocaleString('en-us'));

      for(var _i=0 ; _i<data.length; _i++){
        this.valorCobrado =  (data[_i])[9] - (data[_i])[11];
        this.datosP= [ ...this.datosP, { tipoCuenta: (data[_i])[0], numeroCuentaRechazo: (data[_i])[2], codigoTransaccion: (data[_i])[15], 
          fechaTransaccion: new Date((data[_i])[3]), tipoIdentificacion: (data[_i])[5], numeroDocumento: (data[_i])[7], 
          nombreCliente: (data[_i])[8], valorDeuda: this.formatoMiles('$'+(data[_i])[9].toLocaleString('en-us', {minimumFractionDigits: 2})), codigoOficinaOCeo: (data[_i])[16], 
          nombreOficinaOCeo: (data[_i])[17], resultado: (data[_i])[10], valorCobrado: this.formatoMiles('$'+this.valorCobrado.toLocaleString('en-us', {minimumFractionDigits: 2})), valorPendiente: this.formatoMiles('$'+(data[_i])[11].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
      ];
      }
      this.dataSource.data=  this.datosP;

    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información: "+error);
      this.dataSource.data= [];
    });*/
  }

  ExportTOExcel()  {
    this.spinner.show();
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    /* save to file */
    XLSX.writeFile(wb, 'ConsultaPendientesRecobros.xlsx');
    this.spinner.hide();
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
    this.dataSource = new ListapendientesDataSource();

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

   
    this.recobrosService.findPendientes(this.pickerInicio, this.pickerFin, this.numDocumento, this.oficina, this.numCuenta, this.codTransaccion).subscribe(data => {     
      
      this.datosP=[];
      this.datosExcel=[];
      this.dataSource.data = this.datosP;
      this.total= 0;
      this.numeroFilas= 0;
      
      if(data.length!= 0){  
        

      for(var _i=0 ; _i<data.length; _i++){
        this.total= this.total + (data[_i])[10];        
        this.numeroFilas++;
        this.valorCobrado = (data[_i])[11];
        this.incobrable = (data[_i])[16] == '0' ? 'No' : 'Si';
        this.datosP= [ ...this.datosP, { tipoCuenta: (data[_i])[0], numeroCuentaRechazo: (data[_i])[1], estadoCuenta: (data[_i])[2],
          saldoCuenta: this.formatoMiles('$'+(data[_i])[3].toLocaleString('en-us', {minimumFractionDigits: 2})),
          codigoTransaccion: (data[_i])[4], fechaTransaccion: new Date((data[_i])[5]), tipoIdentificacion: (data[_i])[6], numeroDocumento: (data[_i])[7], 
          nombreCliente: (data[_i])[8], valorDeuda: this.formatoMiles('$'+(data[_i])[9].toLocaleString('en-us', {minimumFractionDigits: 2})), codigoOficinaOCeo: (data[_i])[12], 
          nombreOficinaOCeo: (data[_i])[13], resultado: (data[_i])[14], valorCobrado: this.formatoMiles('$'+this.valorCobrado.toLocaleString('en-us', {minimumFractionDigits: 2})), 
          valorPendiente: this.formatoMiles('$'+(data[_i])[10].toLocaleString('en-us', {minimumFractionDigits: 2})), 
          fechaDeuda: new Date((data[_i])[15]), incobrable: this.incobrable }  
        ];
        this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[4], FechaTransaccion: new Date((data[_i])[5]),
          FechaDeuda: new Date((data[_i])[15]),  TipoCuenta: (data[_i])[0],
          NumeroCuentaRechazo: (data[_i])[1], ValorDeuda: (data[_i])[9], ValorPendiente: (data[_i])[10], CodigoOficina: (data[_i])[12],
          ValorCobrado: this.valorCobrado, SaldoCuenta: (data[_i])[3], EstadoCuentaRechazo: (data[_i])[2], 
          TipoIdentificacion: (data[_i])[6], NumeroDocumento: (data[_i])[7], NombreCliente: (data[_i])[8], Incobrable: this.incobrable }  
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
