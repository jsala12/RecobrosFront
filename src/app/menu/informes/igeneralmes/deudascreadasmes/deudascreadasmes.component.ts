import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { DeudascreadasmesDataSource, DeudascreadasmesItem } from './deudascreadasmes-datasource';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';
import { recobrosServices } from 'src/app/service/recobro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import * as XLSX from 'xlsx'; 
import { FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/menu/configuraciones/excepciones/cliente/cliente.component';

@Component({
  selector: 'app-deudascreadasmes',
  templateUrl: './deudascreadasmes.component.html',
  styleUrls: ['./deudascreadasmes.component.css']
})
export class DeudascreadasmesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<DeudascreadasmesItem>;
  dataSource: DeudascreadasmesDataSource;
  toppingsMeses = new FormControl();
  matcher = new MyErrorStateMatcher();

  displayedColumns = ['anoMes', 'cantidad', 'valor'];
  datosP=[];
  datosExcel=[];
  meses=[];
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
  selectedMes: string;
  selected='';

  constructor(public authService: AuthService, private global: Global,
    private recobrosService: recobrosServices, private spinner: NgxSpinnerService, 
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.authService.actualizarSesion(this.global.timeOut);

    this.dataSource = new DeudascreadasmesDataSource();
    this.dataSource.data= this.datosP;
    this.toppingsMeses = new FormControl(); 
    this.toppingsMeses.setValue([]);
    /*
    this.recobrosService.findDeudasCreadasMes().subscribe(data => {

      this.totalCantidad=0;
      this.totalValor=0;

      for(var _i=0 ; _i<data.length; _i++){
        this.totalCantidad= this.totalCantidad+ (data[_i])[1];
        this.totalValor= this.totalValor+ (data[_i])[2];
        this.datosP= [ ...this.datosP, { anoMes: (data[_i])[0], cantidad: this.formatoMiles((data[_i])[1].toLocaleString('en-us')), 
          valor: this.formatoMiles('$'+(data[_i])[2].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
        ];
        this.datosExcel= [ ...this.datosExcel, { Periodo: (data[_i])[0], Cantidad: (data[_i])[1], Valor: (data[_i])[2]}];

        this.meses= [ ...this.meses, { anoMes: (data[_i])[0]}  
      ];
      }
      this.dataSource.data=  this.datosP;
      this.numeroFilas= this.dataSource.data.length;
      this.totalCantidad= this.formatoMiles(this.totalCantidad.toLocaleString('en-us'));
      this.totalValor= this.formatoMiles('$'+this.totalValor.toLocaleString('en-us'));
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información: "+error);
      this.dataSource.data= [];
    });*/
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

  filtrarTabla(){
    this.authService.actualizarSesion(this.global.timeOut);    
    this.spinner.show();

    this.dataSource = new DeudascreadasmesDataSource();
    this.selectedMes= this.selected;
    console.log(this.selectedMes);
    this.recobrosService.findDeudasCreadasMes().subscribe(data => {
      this.totalCantidad= 0;
      this.totalValor= 0;   
      this.datosP=[];
      this.datosExcel=[];
      this.dataSource.data = this.datosP;
      if(this.toppingsMeses.value.length>0){
        for(var _i=0 ; _i<data.length; _i++){
          for(let mes of this.toppingsMeses.value){
            if((data[_i])[0]== mes){
              this.totalCantidad= this.totalCantidad+ (data[_i])[1];
              this.totalValor= this.totalValor+ (data[_i])[2];
              this.datosP= [ ...this.datosP, { anoMes: (data[_i])[0], cantidad: this.formatoMiles((data[_i])[1].toLocaleString('en-us')), 
                valor: this.formatoMiles('$'+(data[_i])[2].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
              ];
              this.datosExcel= [ ...this.datosExcel, { Periodo: (data[_i])[0], Cantidad: (data[_i])[1], Valor: (data[_i])[2]}];            
              this.meses= [ ...this.meses, { anoMes: (data[_i])[0]}  
              ];
            }
          }       
        }
      }else{
        for(var _i=0 ; _i<data.length; _i++){
          this.totalCantidad= this.totalCantidad+ (data[_i])[1];
          this.totalValor= this.totalValor+ (data[_i])[2];
          this.datosP= [ ...this.datosP, { anoMes: (data[_i])[0], cantidad: this.formatoMiles((data[_i])[1].toLocaleString('en-us')), 
            valor: this.formatoMiles('$'+(data[_i])[2].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
          ];
          this.datosExcel= [ ...this.datosExcel, { Periodo: (data[_i])[0], Cantidad: (data[_i])[1], Valor: (data[_i])[2]}];            
          this.meses= [ ...this.meses, { anoMes: (data[_i])[0]}  
          ];    
        }
      }
      
      this.dataSource.sort = this.sort;
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;      
      this.table.dataSource = this.dataSource;
      this.dataSource.data.push(...this.datosP);
      this.numeroFilas= this.dataSource.data.length;
      this.totalCantidad= this.formatoMiles(this.totalCantidad.toLocaleString('en-us'));
      this.totalValor= this.formatoMiles('$'+this.totalValor.toLocaleString('en-us'));
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de deudas creadas por mes: "+error);
      this.dataSource.data= [];
    });
  }

  cargarTodos(){
    this.spinner.show();    
    this.authService.actualizarSesion(this.global.timeOut);
    
    this.dataSource = new DeudascreadasmesDataSource();
    this.toppingsMeses = new FormControl(); 
    this.toppingsMeses.setValue([]);
    this.recobrosService.findDeudasCreadasMes().subscribe(data => {
      this.totalCantidad= 0;
      this.totalValor= 0;   
      this.datosP=[];
      this.datosExcel=[];
      this.meses=[];
      this.dataSource.data = this.datosP;   

      for(var _i=0 ; _i<data.length; _i++){
        this.totalCantidad= this.totalCantidad+ (data[_i])[1];
        this.totalValor= this.totalValor+ (data[_i])[2];
        this.datosP= [ ...this.datosP, { anoMes: (data[_i])[0], cantidad: this.formatoMiles((data[_i])[1].toLocaleString('en-us')), 
          valor: this.formatoMiles('$'+(data[_i])[2].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
        ];
        this.datosExcel= [ ...this.datosExcel, { Periodo: (data[_i])[0], Cantidad: (data[_i])[1], Valor: (data[_i])[2]}];
        this.meses= [ ...this.meses, { anoMes: (data[_i])[0]}  
      ];
      }
      this.dataSource.sort = this.sort;
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;      
      this.table.dataSource = this.dataSource;
      this.dataSource.data.push(...this.datosP);
      this.numeroFilas= this.dataSource.data.length;
      this.totalCantidad= this.formatoMiles(this.totalCantidad.toLocaleString('en-us'));
      this.totalValor= this.formatoMiles('$'+this.totalValor.toLocaleString('en-us'));
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de cobros creados por mes: "+error);
      this.dataSource.data= [];
    });
  }

  ExportTOExcel()  {
    this.spinner.show();
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    /* save to file */
    XLSX.writeFile(wb, 'InformeDeudasCreadasMes.xlsx');
    this.spinner.hide();
  }
 

}
