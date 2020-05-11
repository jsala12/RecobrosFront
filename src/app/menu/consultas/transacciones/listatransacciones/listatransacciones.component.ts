import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListatransaccionesDataSource, ListatransaccionesItem } from './listatransacciones-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import * as XLSX from 'xlsx'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-listatransacciones',
  templateUrl: './listatransacciones.component.html',
  styleUrls: ['./listatransacciones.component.css']
})
export class ListatransaccionesComponent implements AfterViewInit, OnInit {
  [x: string]: any;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListatransaccionesItem>;
  dataSource: ListatransaccionesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codigoTransaccion','cobrosExitosos',  'valorCobrosExitosos', 'deudasPendientes','valorDeudasPendientes', 'valorDeudasIncobrables', 'deudasIncobrables',
                      'deudasExcepcionadas', 'valorDeudasExcepcionadas'];

  datosP=[];
  datosExcel=[];
  total: any;
  numeroFilas: any;
  valorCobrado: number;
  fechaI: any;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date();

  constructor(private recobrosService: recobrosServices, private spinner: NgxSpinnerService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.dataSource = new ListatransaccionesDataSource();
    this.dataSource.data=  this.datosP;
    /*this.recobrosService.findTransacciones('', '', '').subscribe(data => {
      
      this.numeroFilas= 0;
      if(data.length!=0){
        this.numeroFilas= this.formatoMiles(data.length.toLocaleString('en-us'));
        
        for(var _i=0 ; _i<data.length; _i++){
          this.datosP= [ ...this.datosP, { codigoTransaccion: (data[_i])[0], valorCobrosExitosos: this.formatoMiles('$'+(data[_i])[1].toLocaleString('en-us', {minimumFractionDigits: 2})), cobrosExitosos: this.formatoMiles((data[_i])[2].toLocaleString('en-us')), 
            valorDeudasIncobrables: this.formatoMiles('$'+(data[_i])[3].toLocaleString('en-us', {minimumFractionDigits: 2})), deudasIncobrables: this.formatoMiles((data[_i])[4].toLocaleString('en-us')), valorDeudasExcepcionadas: this.formatoMiles('$'+(data[_i])[5].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            deudasExcepcionadas: this.formatoMiles((data[_i])[6].toLocaleString('en-us')), valorDeudasPendientes: this.formatoMiles('$'+(data[_i])[7].toLocaleString('en-us', {minimumFractionDigits: 2})), deudasPendientes: this.formatoMiles((data[_i])[8].toLocaleString('en-us'))}  
        ];
        }
      }
      
      this.dataSource.data=  this.datosP;
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información: "+error);
      this.dataSource.data= [];
    });*/
  }

  ExportTOExcel()  {
    console.log("Entró a exportar");
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    /* save to file */
    XLSX.writeFile(wb, 'ConsultaTransaccionesRecobros.xlsx');
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.spinner.hide();
  }

  filtrarReporte(){    
    this.spinner.show();
    this.dataSource = new ListatransaccionesDataSource();

    this.pickerInicio = (<HTMLInputElement>document.getElementById("pickerInicio")).value;
    if(this.pickerInicio!=""){
      this.pickerInicio = this.formatoFecha(this.pickerInicio);
    }  
    this.pickerFin = (<HTMLInputElement>document.getElementById("pickerFin")).value;
    if(this.pickerFin!=""){
      this.pickerFin = this.formatoFecha(this.pickerFin);
    }     
    this.codTransaccion = (<HTMLInputElement>document.getElementById("codTransaccion")).value;

   
    this.recobrosService.findTransacciones(this.pickerInicio, this.pickerFin, this.codTransaccion).subscribe(data => {  
      this.datosP=[];
      this.datosExcel=[];
      this.dataSource.data = this.datosP;
      this.numeroFilas= 0;
      if(data.length!=0){
        this.numeroFilas= this.formatoMiles(data.length.toLocaleString('en-us'));
        
        for(var _i=0 ; _i<data.length; _i++){
          this.datosP= [ ...this.datosP, { codigoTransaccion: (data[_i])[0], valorCobrosExitosos: this.formatoMiles('$'+(data[_i])[1].toLocaleString('en-us', {minimumFractionDigits: 2})), cobrosExitosos: this.formatoMiles((data[_i])[2].toLocaleString('en-us')), 
            valorDeudasIncobrables: this.formatoMiles('$'+(data[_i])[3].toLocaleString('en-us', {minimumFractionDigits: 2})), deudasIncobrables: this.formatoMiles((data[_i])[4].toLocaleString('en-us')), valorDeudasExcepcionadas: this.formatoMiles('$'+(data[_i])[5].toLocaleString('en-us', {minimumFractionDigits: 2})), 
            deudasExcepcionadas: this.formatoMiles((data[_i])[6].toLocaleString('en-us')), valorDeudasPendientes: this.formatoMiles('$'+(data[_i])[7].toLocaleString('en-us', {minimumFractionDigits: 2})), deudasPendientes: this.formatoMiles((data[_i])[8].toLocaleString('en-us'))}  
          ];
          this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[0], CobrosExitosos: (data[_i])[2], ValorCobrosExitosos: (data[_i])[1],  
            DeudasIncobrables: (data[_i])[4], ValorDeudasIncobrables: (data[_i])[3], DeudasExcepcionadas: (data[_i])[6], ValorDeudasExcepcionadas: (data[_i])[5],
            DeudasPendientes: (data[_i])[8], ValorDeudasPendientes: (data[_i])[7]}  
        ];
        }
      }
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
