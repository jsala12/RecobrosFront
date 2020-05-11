import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { IpendientesDataSource, IpendientesItem } from './ipendientes-datasource';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';
import { recobrosServices } from 'src/app/service/recobro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import * as XLSX from 'xlsx'; 
import { BehaviorSubject } from 'rxjs';
import { GraficaComponent } from 'src/app/menu/consultas/general/grafica/grafica.component';
import { registerLocaleData, formatDate } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR'; 

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
  },
  marron: {
    primary: '#996633',
  },
  gris: {
    primary: '#d9d9d9',
  }
};

@Component({
  selector: 'app-ipendientes',
  templateUrl: './ipendientes.component.html',
  styleUrls: ['./ipendientes.component.css']
})
export class IpendientesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<IpendientesItem>;
  dataSource: IpendientesDataSource;
  dataSourceA = new BehaviorSubject([])

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codigoTransaccion', 'nombreTransaccion', 'cantidad', 'valor'];
  datosP=[];
  total: number;
  numeroFilas: number;
  valorEntero: any;
  valor: any;
  i: number;
  valorDecimal: any;
  totalCantidad: number;
  totalValor: number;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date();
  pickerInicio: string;
  pickerFin: string;
  codTransaccion: string;
  fechaI: any;
  mesI: string;
  diaI: string;
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartColors = [ { backgroundColor: [colors.blue.primary, colors.green.primary, colors.yellow.primary, colors.red.primary, colors.marron.primary, colors.gris.primary], }, ]; 
  n: number;
  sumaOtros: number;
  fechaFinal=null;
  fechaInicial=null;
  datosPA=[];
  datosExcel=[];

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private spinner: NgxSpinnerService, private alertService: AlertService) {
  }

  ngOnInit() {  
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//  
    this.dataSource = new IpendientesDataSource();
    this.dataSource.data=  this.datosP;
    /*this.recobrosService.findIpendientes('','','').subscribe(data => {

      this.totalCantidad=0;
      this.totalValor=0;

      for(var _i=0 ; _i<data.length; _i++){
        this.totalCantidad= this.totalCantidad+ (data[_i])[1];
        this.totalValor= this.totalValor+ (data[_i])[2];
        this.datosP= [ ...this.datosP, { codigoTransaccion: (data[_i])[0], nombreTransaccion: (data[_i])[3], cantidad: this.formatoMiles((data[_i])[1].toLocaleString('en-us')), 
          valor: this.formatoMiles('$'+(data[_i])[2].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
        ];

        this.datosPA= [ ...this.datosPA, { codigoTransaccion: (data[_i])[0], nombreTransaccion: (data[_i])[3], cantidad: this.formatoMiles((data[_i])[1].toLocaleString('en-us')), 
        valor: (data[_i])[2]}]; 

        this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[0], NombreTransaccion: (data[_i])[3], Cantidad: (data[_i])[1], 
        Valor: (data[_i])[2]}]; 
      }

      //Ordena los descendentemente segun el valor.
      var sortedArray: { valor: number; }[] = this.datosPA.sort((n1,n2) => {
        if (n1.valor < n2.valor) {return 1;}    
        if (n1.valor > n2.valor) {return -1;}    
        return 0;
      });

      this.datosPA= sortedArray;
      this.n=0;  
      this.sumaOtros=0;    
      for(let dato of this.datosPA){        
        if(this.n<4){
          this.pieChartLabels = [ ...this.pieChartLabels, dato.codigoTransaccion];
          this.pieChartData= [ ...this.pieChartData, dato.valor];
        }else{
          this.sumaOtros=dato.valor;
        }
        this.n++;
      }
      this.pieChartLabels.push("Otras transacciones");
      this.pieChartData.push(this.sumaOtros); 

      this.dataSource.data=  this.datosP;
      this.numeroFilas= this.dataSource.data.length;
      this.totalCantidad= this.formatoMiles(this.totalCantidad.toLocaleString('en-us'));
      this.totalValor= this.formatoMiles('$'+this.totalValor.toLocaleString('en-us'))
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información: "+error);
      this.dataSource.data= [];
      this.pieChartLabels = [];
      this.pieChartData = [];
    });*/
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.spinner.hide();
  }

  ExportTOExcel()  {
    this.spinner.show();
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    /* save to file */
    XLSX.writeFile(wb, 'InformePendientes.xlsx');
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
    this.dataSource = new IpendientesDataSource();

    this.pickerInicio="";
    this.pickerFin="";
    this.fechaInicial="";
    this.fechaFinal="";
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

    this.pickerInicio = (<HTMLInputElement>document.getElementById("pickerInicio")).value;
    if(this.pickerInicio!=""){
      this.pickerInicio = this.formatoFecha(this.pickerInicio);
    }  
    this.pickerFin = (<HTMLInputElement>document.getElementById("pickerFin")).value;
    if(this.pickerFin!=""){
      this.pickerFin = this.formatoFecha(this.pickerFin);
    }     
    this.codTransaccion = (<HTMLInputElement>document.getElementById("codTransaccion")).value;

    this.recobrosService.findIpendientes(this.pickerInicio, this.pickerFin, this.codTransaccion).subscribe(data => {     
      
      this.datosP=[];
      this.datosPA= [];
      this.datosExcel=[];
      this.pieChartLabels=[];
      this.pieChartData=[];
      this.dataSource.data = this.datosP;
      this.totalCantidad= 0;
      this.totalValor= 0;
      this.numeroFilas= 0;
      
      if(data.length!= 0){ 

      for(var _i=0 ; _i<data.length; _i++){
        this.totalCantidad= this.totalCantidad+ (data[_i])[1];
        this.totalValor= this.totalValor+ (data[_i])[2];
        this.datosP= [ ...this.datosP, { codigoTransaccion: (data[_i])[0], nombreTransaccion: (data[_i])[3], cantidad: this.formatoMiles((data[_i])[1].toLocaleString('en-us')), 
          valor: this.formatoMiles('$'+(data[_i])[2].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
        ];

        this.datosPA= [ ...this.datosPA, { codigoTransaccion: (data[_i])[0], nombreTransaccion: (data[_i])[3], cantidad: this.formatoMiles((data[_i])[1].toLocaleString('en-us')), 
        valor: (data[_i])[2]}];

        this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[0], NombreTransaccion: (data[_i])[3], Cantidad: (data[_i])[1], 
          Valor: (data[_i])[2]}]; 
      }
    }   


      //Ordena los descendentemente segun el valor.
      var sortedArray: { valor: number; }[] = this.datosPA.sort((n1,n2) => {
        if (n1.valor < n2.valor) {return 1;}    
        if (n1.valor > n2.valor) {return -1;}    
        return 0;
      });

      this.datosPA= sortedArray;
      this.n=0;  
      this.sumaOtros=0;    
      for(let dato of this.datosPA){        
        if(this.n<4){
          this.pieChartLabels = [ ...this.pieChartLabels, dato.codigoTransaccion];
          this.pieChartData= [ ...this.pieChartData, dato.valor];
        }else{
          this.sumaOtros=dato.valor;
        }
        this.n++;
      }
      this.pieChartLabels.push("Otras transacciones");
      this.pieChartData.push(this.sumaOtros);

      this.dataSource.sort = this.sort;
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;      
     this.dataSource.data.push(...this.datosP);
     this.numeroFilas= this.dataSource.data.length;
     this.totalCantidad= this.formatoMiles(this.totalCantidad.toLocaleString('en-us'));
     this.totalValor= this.formatoMiles('$'+this.totalValor.toLocaleString('en-us'))

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
}
