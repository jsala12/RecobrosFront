import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListaarqueoDataSource, ListaarqueoItem } from './listaarqueo-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import { AlertService } from 'ngx-alerts';
import * as XLSX from 'xlsx'; 
import { NgxSpinnerService } from 'ngx-spinner';
import {formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR'; 
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-listaarqueo',
  templateUrl: './listaarqueo.component.html',
  styleUrls: ['./listaarqueo.component.css']
})
export class ListaarqueoComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListaarqueoItem>;
  dataSource: ListaarqueoDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fecha', 'unidadNegocio', 'valorDeuda', 'pendiente', 'exitoso'];

  datosP=[];
  datosPA=[];
  pickerInicio: string;
  pickerFin: string;
  oficina='';
  fechaI= [];
  mesI: string;
  diaI: string;
  valor;
  valorEntero: any;
  valorDecimal: any;
  i;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date();
  fechaA: string;

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private changeDetectorRefs: ChangeDetectorRef, private alertService: AlertService, private spinner: NgxSpinnerService){
  }

  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.dataSource = new ListaarqueoDataSource();
    this.recobrosService.findHerramientasArqueo('', '', '').subscribe(data => {      
      for(var _i=0 ; _i<data.length; _i++){
        if((data[_i])[0]==null){
          this.fechaA="No hay datos";
        }else{
          this.fechaA=formatDate((data[_i])[0], 'MMMM d, y', 'es-Ar', '-0500');
        }
        if((data[_i])[2]==null){
          (data[_i])[2]=0;
        }
        if((data[_i])[3]==null){
          (data[_i])[3]=0;
        }
        if((data[_i])[4]==null){
          (data[_i])[4]=0;
        }
        this.datosP= [ ...this.datosP, { fecha: this.fechaA, unidadNegocio: (data[_i])[1], valorDeuda: this.formatoMiles('$'+(data[_i])[2].toLocaleString('en-us', {minimumFractionDigits: 2})), pendiente: this.formatoMiles('$'+(data[_i])[3].toLocaleString('en-us', {minimumFractionDigits: 2})), exitoso: this.formatoMiles('$'+(data[_i])[4].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
        ];
        this.datosPA= [ ...this.datosPA, { fecha: this.fechaA, unidadNegocio: (data[_i])[1], valorDeuda:(data[_i])[2], pendiente:(data[_i])[3], exitoso: (data[_i])[4]}  
        ];
      }
      this.dataSource.data=  this.datosP;
      console.log(this.dataSource.data);
    }, error => { 
      this.alertService.warning("No se pudo cargar la información de arqueos: "+error);
      this.dataSource.data= [];
    }); 
  }

  ExportTOExcel()  {
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.datosPA);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    /* save to file */
    XLSX.writeFile(wb, 'ArqueoDiario.xlsx');
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
    this.dataSource = new ListaarqueoDataSource();
    this.pickerInicio = (<HTMLInputElement>document.getElementById("pickerInicio")).value;
    if(this.pickerInicio!=""){
      this.pickerInicio = this.formatoFecha(this.pickerInicio);
    }    
    
    this.pickerFin = (<HTMLInputElement>document.getElementById("pickerFin")).value;
    if(this.pickerFin!=""){
      this.pickerFin = this.formatoFecha(this.pickerFin);
    }    
    this.oficina = (<HTMLInputElement>document.getElementById("oficina")).value; 
   
    this.recobrosService.findHerramientasArqueo(this.pickerInicio, this.pickerFin, this.oficina).subscribe(data => {     
      this.datosP=[];
      this.datosPA=[];
      this.dataSource.data = this.datosP;
      for(var _i=0 ; _i<data.length; _i++){
        if((data[_i])[0]==null){
          this.fechaA="No hay datos";
        }else{
          this.fechaA=formatDate((data[_i])[0], 'MMMM d, y', 'es-Ar', '-0500');
        }
        if((data[_i])[2]==null){
          (data[_i])[2]=0;
        }
        if((data[_i])[3]==null){
          (data[_i])[3]=0;
        }
        if((data[_i])[4]==null){
          (data[_i])[4]=0;
        }
        this.datosP= [ ...this.datosP, { fecha: formatDate((data[_i])[0], 'MMMM d, y', 'es-Ar', '-0500'), unidadNegocio: (data[_i])[1], valorDeuda: this.formatoMiles('$'+(data[_i])[2].toLocaleString('en-us', {minimumFractionDigits: 2})), pendiente: this.formatoMiles('$'+(data[_i])[3].toLocaleString('en-us', {minimumFractionDigits: 2})), exitoso: this.formatoMiles('$'+(data[_i])[4].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
        ];
        this.datosPA= [ ...this.datosPA, { fecha: this.fechaA, unidadNegocio: (data[_i])[1], valorDeuda:(data[_i])[2], pendiente:(data[_i])[3], exitoso: (data[_i])[4]}  
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
      this.alertService.warning("No se pudo actualizar la información de arqueos: "+error);
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