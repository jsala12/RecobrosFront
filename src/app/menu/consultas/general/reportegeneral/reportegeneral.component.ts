import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef  } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { ReportegeneralDataSource, ReportegeneralItem } from './reportegeneral-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import * as XLSX from 'xlsx'; 
import { BehaviorSubject } from 'rxjs';
import { GraficaComponent } from '../grafica/grafica.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR'; 
import {formatDate } from '@angular/common';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';

registerLocaleData(localeEsAr, 'es-Ar');

const colors: any = {
  red: {
    primary: '#FF6384',
  },
  blue: {
    primary: '#36A2EB',
  },
  yellow: {
    primary: '#e3bc08',
  },
  green: {
    primary: '#1FF00A',
  }
};

@Component({
  selector: 'app-reportegeneral',
  templateUrl: './reportegeneral.component.html',
  styleUrls: ['./reportegeneral.component.css']
})
export class ReportegeneralComponent implements AfterViewInit, OnInit {
  @ViewChild('TABLE', {static: false}) table1: ElementRef; 
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ReportegeneralItem>;
  dataSource: ReportegeneralDataSource;
  dataSourceA = new BehaviorSubject([]);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['estado', 'cantidad', 'valor'];

  valorExitosos: string;
  valorExcepcionados: string;
  valorNoCobrables: string;
  valorPendientes: string;
  valorTotal:string;
  pickerInicio: string;
  pickerFin: string;
  datosP:ReportegeneralItem[]=[];
  fechaI=[];
  diaI: string;
  mesI: string;
  public pieChartDataA = [];
  public pieChartLabelsA = [];
  public pieChartColorsA = [];
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartColors = [ { backgroundColor: [colors.blue.primary, colors.green.primary, colors.yellow.primary, colors.red.primary], }, ]; 
  fechaFinal=null;
  fechaInicial=null;
  valor;
  valorEntero: any;
  valorDecimal: any;
  i;
  today= new Date();  
  minDate = new Date(1990, 0, 1);
  maxDate = new Date();

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private changeDetectorRefs: ChangeDetectorRef, private spinner: NgxSpinnerService, private alertService: AlertService){
  }

  @ViewChild(GraficaComponent,{static: false}) private grafica: GraficaComponent;

  ngOnInit() {  
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.dataSource = new ReportegeneralDataSource();    
    this.dataSource.data= [];
    this.pieChartLabels= [];
    this.pieChartData= [];
    /*this.recobrosService.findByName('', '').subscribe(data => {
      
      if((data[0])[2]== null){
       this.valorExitosos= '0';
      }else{
        this.valorExitosos= this.formatoMiles('$'+(data[0])[2].toLocaleString('en-us', {minimumFractionDigits: 2}));
      }
      if((data[1])[2]== null){
        this.valorExcepcionados= '0';
      }else{
        this.valorExcepcionados= this.formatoMiles('$'+(data[1])[2].toLocaleString('en-us', {minimumFractionDigits: 2}));
      }
      if((data[2])[2]== null){
        this.valorNoCobrables= '0';
      }else{
        this.valorNoCobrables= this.formatoMiles('$'+(data[2])[2].toLocaleString('en-us', {minimumFractionDigits: 2}));
      }
      if((data[3])[2]== null){
      this.valorPendientes= '0';
      }else{
        this.valorPendientes= this.formatoMiles('$'+(data[3])[2].toLocaleString('en-us', {minimumFractionDigits: 2}));
      }
      if((data[4])[2]== null){
        this.valorTotal= '0';
      }else{
        this.valorTotal= this.formatoMiles('$'+(data[4])[2].toLocaleString('en-us', {minimumFractionDigits: 2}));
      }


     this.dataSource.data= [ { estado: (data[0])[0], cantidad: this.formatoMiles((data[0])[1].toLocaleString('en-us')), valor: this.valorExitosos },
                            { estado: (data[1])[0], cantidad: this.formatoMiles((data[1])[1].toLocaleString('en-us')), valor: this.valorExcepcionados },
                            { estado: (data[2])[0], cantidad: this.formatoMiles((data[2])[1].toLocaleString('en-us')), valor: this.valorNoCobrables },
                            { estado: (data[3])[0], cantidad: this.formatoMiles((data[3])[1].toLocaleString('en-us')), valor: this.valorPendientes },
                            { estado: (data[4])[0], cantidad: this.formatoMiles((data[4])[1].toLocaleString('en-us')), valor: this.valorTotal },  
      ];

      this.pieChartLabels= [(data[0])[0], (data[1])[0], (data[2])[0], (data[3])[0]];
      this.pieChartData= [(data[0])[2], (data[1])[2], (data[2])[2], (data[3])[2]];

    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información: "+error);
      this.dataSource.data= [];
    });*/
  }

  ExportTOExcel()  {
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    /* save to file */
    XLSX.writeFile(wb, 'ReporteGeneralRecobros.xlsx');
  }

  ngAfterViewInit() {    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.spinner.hide();
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

  filtrarReporte(){    
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.spinner.show();
    this.pickerInicio="";
    this.pickerFin="";
    this.fechaInicial="";
    this.fechaFinal="";
    this.dataSource = new ReportegeneralDataSource();
    this.pickerInicio = (<HTMLInputElement>document.getElementById("pickerInicio")).value;    
    if(this.pickerInicio!=""){
      this.fechaInicial= formatDate(this.pickerInicio, 'MMMM d, y', 'es-Ar', '-0500');
      this.pickerInicio = this.formatoFecha(this.pickerInicio);
    }

    this.pickerFin = (<HTMLInputElement>document.getElementById("pickerFin")).value;    
    if(this.pickerFin!=""){
      this.fechaFinal= formatDate(this.pickerFin, 'MMMM d, y', 'es-Ar', '-0500');
      this.pickerFin = this.formatoFecha(this.pickerFin);
    } 
   
    this.recobrosService.findByName(this.pickerInicio, this.pickerFin).subscribe(data => {     
      
      if((data[0])[2]== null){
       this.valorExitosos= '0';
      }else{
        this.valorExitosos= this.formatoMiles('$'+(data[0])[2].toLocaleString('en-us', {minimumFractionDigits: 2}));
      }
      if((data[1])[2]== null){
        this.valorExcepcionados= '0';
      }else{
        this.valorExcepcionados= this.formatoMiles('$'+(data[1])[2].toLocaleString('en-us', {minimumFractionDigits: 2}));
      }
      if((data[2])[2]== null){
        this.valorNoCobrables= '0';
      }else{
        this.valorNoCobrables= this.formatoMiles('$'+(data[2])[2].toLocaleString('en-us', {minimumFractionDigits: 2}));
      }
      if((data[3])[2]== null){
      this.valorPendientes= '0';
      }else{
        this.valorPendientes= this.formatoMiles('$'+(data[3])[2].toLocaleString('en-us', {minimumFractionDigits: 2}));
      }
      if((data[4])[2]== null){
        this.valorTotal= '0';
      }else{
        this.valorTotal= this.formatoMiles('$'+(data[4])[2].toLocaleString('en-us', {minimumFractionDigits: 2}));
      }
      this.datosP=[];
      this.dataSource.data = this.datosP;
      this.datosP=[ { estado: (data[0])[0], cantidad: this.formatoMiles((data[0])[1].toLocaleString('en-us')), valor: this.valorExitosos },
      { estado: (data[1])[0], cantidad: this.formatoMiles((data[1])[1].toLocaleString('en-us')), valor: this.valorExcepcionados },
      { estado: (data[2])[0], cantidad: this.formatoMiles((data[2])[1].toLocaleString('en-us')), valor: this.valorNoCobrables },
      { estado: (data[3])[0], cantidad: this.formatoMiles((data[3])[1].toLocaleString('en-us')), valor: this.valorPendientes },
      { estado: (data[4])[0], cantidad: this.formatoMiles((data[4])[1].toLocaleString('en-us')), valor: this.valorTotal },  
      ];
      this.dataSource.sort = this.sort;
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      
     this.dataSource.data.push(...this.datosP);

     this.pieChartLabelsA= [(data[0])[0], (data[1])[0], (data[2])[0], (data[3])[0]];
     this.pieChartDataA= [(data[0])[2], (data[1])[2], (data[2])[2], (data[3])[2]];
     this.pieChartColorsA = [ { backgroundColor: [colors.blue.primary, colors.green.primary, colors.yellow.primary, colors.red.primary], }, ]; 
     
     this.pieChartData.length = 0;
     this.pieChartLabels.length=0;
     this.pieChartColors.push(...this.pieChartColorsA);     
     this.pieChartLabels.push(...this.pieChartLabelsA);
     this.pieChartData.push(...this.pieChartDataA);

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
}
