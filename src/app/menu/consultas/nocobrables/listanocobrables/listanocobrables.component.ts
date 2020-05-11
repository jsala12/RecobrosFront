import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListanocobrablesDataSource, ListanocobrablesItem } from './listanocobrables-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import * as XLSX from 'xlsx'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { Global } from 'src/app/global';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-listanocobrables',
  templateUrl: './listanocobrables.component.html',
  styleUrls: ['./listanocobrables.component.css']
})
export class ListanocobrablesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListanocobrablesItem>;
  dataSource: ListanocobrablesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codigoTransaccion', 'fechaDeuda', 'fechaRechazo',  'valorDeuda',
                      'valorPendiente', 'tipoCuenta', 'numeroCuentaRechazo', 'tipoProducto', 
                      'codigoOficinaOCeo', 'saldoCuenta', 'estadoCuenta',
                      'motivoIncobrable', 'tipoIdentificacion', 'numeroDocumento', 'nombreCliente'];

  datosP=[];
  datosExcel=[];
  total: number;
  numeroFilas: number;
  pickerInicio: string;
  pickerFin: string;
  numDocumento: string;
  oficina: string;
  numCuenta: string;
  codTransaccion: string;
  fechaI: any;
  mesI: string;
  diaI: string;
  valorEntero: any;
  valor: any;
  i: number;
  valorDecimal: any;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date();
  estadoCuenta: string;
  motivoIncobrable: string;

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private spinner: NgxSpinnerService, private alertService: AlertService) {
  }

  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.dataSource = new ListanocobrablesDataSource();
    this.dataSource.data=  this.datosP;
    /*this.recobrosService.findNoCobrables('', '', '', '', '', '').subscribe(data => {
      
      this.total= 0;
      this.numeroFilas= 0;

      if(data.length>0){
        this.total= this.formatoMiles('$'+(data[0])[21].toLocaleString('en-us', {minimumFractionDigits: 2}));
        this.numeroFilas= this.formatoMiles((data[0])[22].toLocaleString('en-us'));
        for(var _i=0 ; _i<data.length; _i++){
          this.datosP= [ ...this.datosP, { tipoCuenta: (data[_i])[0], numeroCuentaRechazo: (data[_i])[2], codigoTransaccion: (data[_i])[3], 
            fechaDeuda: new Date((data[_i])[5]), tipoIdentificacion: (data[_i])[6], numeroDocumento: (data[_i])[9], 
            nombreCliente: (data[_i])[8], valorDeuda: this.formatoMiles('$'+(data[_i])[10].toLocaleString('en-us', {minimumFractionDigits: 2})), codigoOficinaOCeo: (data[_i])[18], 
            nombreOficinaOCeo: (data[_i])[19], resultado: (data[_i])[16], valorPendiente: this.formatoMiles('$'+(data[_i])[11].toLocaleString('en-us', {minimumFractionDigits: 2})), estadoCuenta: (data[_i])[17]}  
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
    XLSX.writeFile(wb, 'ConsultaIncobrablesRecobros.xlsx');
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
    this.dataSource = new ListanocobrablesDataSource();

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

   
    this.recobrosService.findNoCobrables(this.pickerInicio, this.pickerFin, this.numDocumento, this.oficina, this.numCuenta, this.codTransaccion).subscribe(data => {     
      
      this.datosP=[];
      this.datosExcel=[];
      this.dataSource.data = this.datosP;
      this.total= 0;
      this.numeroFilas= 0;
      
      if(data.length!= 0){       
        this.numeroFilas= this.formatoMiles(data.length.toLocaleString('en-us'));
  
        for(var _i=0 ; _i<data.length; _i++){
          if((data[_i])[17]=='Activo'){
            this.estadoCuenta= 'Activa';
          }else{
            this.estadoCuenta= (data[_i])[17];
          } 
          
          this.motivoIncobrable = (data[_i])[22] == null ? 'N/D' : (data[_i])[22];
          
          this.total= this.total+(data[_i])[11];
          this.datosP= [ ...this.datosP, { tipoCuenta: (data[_i])[0], numeroCuentaRechazo: (data[_i])[2], codigoTransaccion: (data[_i])[3], 
            fechaDeuda: new Date((data[_i])[5]), tipoIdentificacion: (data[_i])[6], numeroDocumento: (data[_i])[9], 
            nombreCliente: (data[_i])[8], valorDeuda: this.formatoMiles('$'+(data[_i])[10].toLocaleString('en-us', {minimumFractionDigits: 2})), codigoOficinaOCeo: (data[_i])[18], 
            nombreOficinaOCeo: (data[_i])[19], resultado: (data[_i])[16], valorPendiente: this.formatoMiles('$'+(data[_i])[11].toLocaleString('en-us', {minimumFractionDigits: 2})),
            estadoCuenta: this.estadoCuenta, fechaRechazo: new Date((data[_i])[21]), motivoIncobrable: this.motivoIncobrable, 
            saldoCuenta: this.formatoMiles('$'+(data[_i])[23].toLocaleString('en-us', {minimumFractionDigits: 2})),
            tipoProducto:  (data[_i])[24]
           }  
          ];
          this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[3], FechaDeuda: new Date((data[_i])[5]), FechaRechazo: new Date((data[_i])[21]),
            ValorDeuda: (data[_i])[10], ValorPendiente: (data[_i])[11], TipoCuenta: (data[_i])[0], NumeroCuentaRechazo: (data[_i])[2],  TipoProducto: (data[_i])[24],
            CodigoOficina: (data[_i])[18], SaldoCuenta: (data[_i])[23], EstadoCuenta:  this.estadoCuenta, MotivoIncobrable: (data[_i])[22], TipoIdentificacion: (data[_i])[6], NumeroDocumento: (data[_i])[9], NombreCliente: (data[_i])[8]}  
          ];
        }
    }
    this.total= this.formatoMiles('$'+this.total.toLocaleString('en-us', {minimumFractionDigits: 2}));
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
