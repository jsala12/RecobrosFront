import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListatransaccionesexcepcionadasDataSource, ListatransaccionesexcepcionadasItem } from './listatransaccionesexcepcionadas-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import * as XLSX from 'xlsx'; 
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-listatransaccionesexcepcionadas',
  templateUrl: './listatransaccionesexcepcionadas.component.html',
  styleUrls: ['./listatransaccionesexcepcionadas.component.css']
})
export class ListatransaccionesexcepcionadasComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListatransaccionesexcepcionadasItem>;
  dataSource: ListatransaccionesexcepcionadasDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codigoTransaccion', 'fechaRechazo', 'fechaDeuda','tipoCuenta',
                      'numeroCuentaRechazo', 'codigoOficinaOCeo', 'valorDeuda',
                      'valorPendiente', 'tipoIdentificacion', 'numeroDocumento', 'nombreCliente',
                      'detalleExcepcion'];

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

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices,  private spinner: NgxSpinnerService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.authService.actualizarSesion(this.global.timeOut);
    this.dataSource = new ListatransaccionesexcepcionadasDataSource();
    this.dataSource.data=  this.datosP;
    /*
    this.dataSource = new ListatransaccionesexcepcionadasDataSource();
    this.recobrosService.findTransaccionesExcepcionadas('', '', '', '', '', '').subscribe(data => {   
      console.log(data);   
      this.datosP=[];
      this.total= 0;
      this.numeroFilas= 0;
      if(data.length!= 0){
        this.numeroFilas= this.formatoMiles(data.length.toLocaleString('en-us'));

        for(var _i=0 ; _i<data.length; _i++){
          this.total= this.total+(data[_i])[11];
          this.datosP= [ ...this.datosP, { tipoCuenta: (data[_i])[0], numeroCuentaRechazo: (data[_i])[1], codigoTransaccion: (data[_i])[3], 
            fechaDeuda: new Date((data[_i])[4]), tipoIdentificacion: (data[_i])[6], numeroDocumento: (data[_i])[7], 
            nombreCliente: (data[_i])[8], valorDeuda: this.formatoMiles('$'+(data[_i])[10].toLocaleString('en-us', {minimumFractionDigits: 2})), valorPendiente: this.formatoMiles('$'+(data[_i])[11].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            detalleCatalogo: 'Transacción', detalleExcepcion: (data[_i])[13], codigoOficinaOCeo: (data[_i])[12], 
            nombreOficinaOCeo: (data[_i])[15], resultado: 'Exonerado'}  
          ];
          this.datosExcel= [ ...this.datosExcel, { TipoCuenta: (data[_i])[0], NumeroCuentaRechazo: (data[_i])[1], CodigoTransaccion: (data[_i])[3], 
            FechaDeuda: new Date((data[_i])[4]), TipoIdentificacion: (data[_i])[6], NumeroDocumento: (data[_i])[7], 
            NombreCliente: (data[_i])[8], ValorDeuda: (data[_i])[10], ValorPendiente: (data[_i])[11], DetalleExcepcion: (data[_i])[13], 
            CodigoOficina: (data[_i])[12], NombreOficinaOCeo: (data[_i])[15], ExcepcionadoPor: 'Transacción'}  
          ];
        }
        this.total= this.formatoMiles('$'+this.total.toLocaleString('en-us', {minimumFractionDigits: 2}));
        this.dataSource.data=  this.datosP;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }      
    }, error => { 
      this.alertService.warning("No se pudo cargar la información: "+error);
      this.dataSource.data= [];
    });*/
  }

  ngAfterViewInit() {
    
  }

  ExportTOExcel()  {
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    /* save to file */
    XLSX.writeFile(wb, 'ConsultaTransaccionesExcepcionadoasRecobros.xlsx');
  }

  filtrarReporte(){   
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//  
    this.spinner.show();
    this.dataSource = new ListatransaccionesexcepcionadasDataSource();

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

   
    this.recobrosService.findTransaccionesExcepcionadas(this.pickerInicio, this.pickerFin, this.numDocumento, this.oficina, this.numCuenta, this.codTransaccion).subscribe(data => {     
      
      this.datosP=[];
      this.datosExcel=[];
      this.dataSource.data = this.datosP;
      this.total= 0;
      this.numeroFilas= 0;
      

      if(data.length!= 0){
        this.numeroFilas= this.formatoMiles(data.length.toLocaleString('en-us'));

        for(var _i=0 ; _i<data.length; _i++){
          this.total= this.total+(data[_i])[11];
          this.datosP= [ ...this.datosP, { tipoCuenta: (data[_i])[0], numeroCuentaRechazo: (data[_i])[1], codigoTransaccion: (data[_i])[3], 
            fechaDeuda: new Date((data[_i])[4]), tipoIdentificacion: (data[_i])[6], numeroDocumento: (data[_i])[7], 
            nombreCliente: (data[_i])[8], valorDeuda: this.formatoMiles('$'+(data[_i])[10].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            valorPendiente: this.formatoMiles('$'+(data[_i])[11].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            detalleExcepcion: (data[_i])[13], codigoOficinaOCeo: (data[_i])[12], 
            nombreOficinaOCeo: (data[_i])[15], fechaRechazo: new Date((data[_i])[16]) }  
        ];
        this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[3], FechaRechazo: new Date((data[_i])[16]),
          FechaDeuda: new Date((data[_i])[4]), TipoCuenta: (data[_i])[0], NumeroCuentaRechazo: (data[_i])[1],  
          CodigoOficina: (data[_i])[12], ValorDeuda: (data[_i])[10], ValorPendiente: (data[_i])[11],
          TipoIdentificacion: (data[_i])[6], NumeroDocumento: (data[_i])[7], NombreCliente: (data[_i])[8],
          DetalleExcepcion: (data[_i])[13], ExcepcionadoPor: 'Transacción'}  
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
