import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListacobrosDataSource, ListacobrosItem } from './listacobros-datasource';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';
import { recobrosServices } from 'src/app/service/recobro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import * as XLSX from 'xlsx'; 
import { FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/menu/configuraciones/excepciones/cliente/cliente.component';


@Component({
  selector: 'app-listacobros',
  templateUrl: './listacobros.component.html',
  styleUrls: ['./listacobros.component.css']
})
export class ListacobrosComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListacobrosItem>;
  dataSource: ListacobrosDataSource;
  toppingsTransacciones = new FormControl();
  toppingsMesesCobro = new FormControl();
  matcher = new MyErrorStateMatcher();

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codigoTransaccion', 'fechaCobro', 'cantidad', 'valor'];
  datosP=[];
  datosPC=[];
  datosExcel=[];
  datosExcelC=[];
  codTransacciones=[];
  total: number;
  numeroFilas: number;
  valorEntero: any;
  valor: any;
  i: number;
  valorDecimal: any;
  totalCantidad: number;
  totalValor: number;
  codTransaccion= '';
  selectedCodTransaccion: string;
  selected='';
  transacciones=[];
  mesesCobro=[];
  distinctTransacciones=[];
  //codTransaccion: string;
  selectedMes: string;

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private spinner: NgxSpinnerService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.spinner.show();
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//  
    this.dataSource = new ListacobrosDataSource();
    this.toppingsTransacciones = new FormControl(); 
    this.toppingsTransacciones.setValue([]);
    this.toppingsMesesCobro = new FormControl(); 
    this.toppingsMesesCobro.setValue([]);
    this.dataSource.data= this.datosP;/*

    this.recobrosService.findCobrosMes('').subscribe(data => {
      this.totalCantidad=0;
      this.totalValor=0;

      for(var _i=0 ; _i<data.length; _i++){
        this.totalCantidad= this.totalCantidad+ (data[_i])[2];
        this.totalValor= this.totalValor+ (data[_i])[3];
        this.datosP= [ ...this.datosP, { codigoTransaccion: (data[_i])[0], fechaCobro: (data[_i])[1],cantidad: this.formatoMiles((data[_i])[2].toLocaleString('en-us')), 
          valor: this.formatoMiles('$'+(data[_i])[3].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
        ];
        this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[0], FechaCobro: (data[_i])[1],Cantidad:(data[_i])[2], 
          Valor: (data[_i])[3]}  
        ];
        this.transacciones= [ ...this.transacciones, { cod: (data[_i])[0]}];
        this.mesesCobro= [ ...this.mesesCobro, { anoMes: (data[_i])[1]}];
      }

      //Se crea el array con los distintos códigos de transacción
      this.distinctTransacciones = this.transacciones.filter(
        (thing, i, arr) => arr.findIndex(t => t.cod === thing.cod) === i
      );

      //Se crea el array con los distintos meses cobro
      this.mesesCobro = this.mesesCobro.filter(
        (thing, i, arr) => arr.findIndex(t => t.anoMes === thing.anoMes) === i
      );

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

  ExportTOExcel()  {
    this.spinner.show();
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.datosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    /* save to file */
    XLSX.writeFile(wb, 'Cobros.xlsx');
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
    //console.log(this.toppingsMeses.value);
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------// 
    this.spinner.show();
    this.dataSource = new ListacobrosDataSource();
    this.recobrosService.findCobrosMes('').subscribe(data => {
      this.totalCantidad= 0;
      this.totalValor= 0;   
      this.datosP=[];
      this.datosPC=[];
      this.datosExcel=[];
      this.datosExcelC=[];
      this.mesesCobro=[];
      this.transacciones=[];
      this.dataSource.data = this.datosP;

      for(var _i=0 ; _i<data.length; _i++){
        this.transacciones= [ ...this.transacciones, { cod: (data[_i])[0]}];
        this.mesesCobro= [ ...this.mesesCobro, { anoMes: (data[_i])[1]}];
      }
      //Se crea el array con los distintos códigos de transacción
      this.distinctTransacciones = this.transacciones.filter(
        (thing, i, arr) => arr.findIndex(t => t.cod === thing.cod) === i
      );
      //Ordena los segun el cod.
      var sortedArray1: { cod: number; }[] = this.distinctTransacciones.sort((n1,n2) => {
        if (n1.cod < n2.cod) {return -1;}    
        if (n1.cod > n2.cod) {return 1;}    
        return 0;
      });
      this.distinctTransacciones=sortedArray1;

      //Se crea el array con los distintos meses transacción
      this.mesesCobro = this.mesesCobro.filter(
        (thing, i, arr) => arr.findIndex(t => t.anoMes === thing.anoMes) === i
      );    
      //Ordena los segun el anoMes.
      var sortedArray2: { anoMes: string; }[] = this.mesesCobro.sort((n1,n2) => {
        if (n1.anoMes < n2.anoMes) {return 1;}    
        if (n1.anoMes > n2.anoMes) {return -1;}    
        return 0;
      });
      this.mesesCobro=sortedArray2;

      if(this.toppingsTransacciones.value!=null){
        if(this.toppingsTransacciones.value.length>0){
          for(var _i=0 ; _i<data.length; _i++){
            for(let cod of this.toppingsTransacciones.value){
              if((data[_i])[0]== cod){
                this.totalCantidad= this.totalCantidad+ (data[_i])[2];
                this.totalValor= this.totalValor+ (data[_i])[3];
                this.datosP= [ ...this.datosP, { codigoTransaccion: (data[_i])[0], fechaCobro: (data[_i])[1],cantidad: this.formatoMiles((data[_i])[2].toLocaleString('en-us')), 
                valor: this.formatoMiles('$'+(data[_i])[3].toLocaleString('en-us', {minimumFractionDigits: 2})), cantidadA: data[_i][2], valorA: data[_i][3]}  
                ];
                this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[0], FechaCobro: (data[_i])[1],Cantidad:(data[_i])[2], 
                  Valor: (data[_i])[3]}  
                ];
              }
            }       
          }
        }else{
          for(var _i=0 ; _i<data.length; _i++){
            this.totalCantidad= this.totalCantidad+ (data[_i])[2];
            this.totalValor= this.totalValor+ (data[_i])[3];
            this.datosP= [ ...this.datosP, { codigoTransaccion: (data[_i])[0], fechaCobro: (data[_i])[1],cantidad: this.formatoMiles((data[_i])[2].toLocaleString('en-us')), 
            valor: this.formatoMiles('$'+(data[_i])[3].toLocaleString('en-us', {minimumFractionDigits: 2})), cantidadA: data[_i][2], valorA: data[_i][3]}  
            ];  
            this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[0], FechaCobro: (data[_i])[1],Cantidad:(data[_i])[2], 
              Valor: (data[_i])[3]}  
            ];
          }
        }
      }

      if(this.toppingsMesesCobro.value!=null){
        if(this.toppingsMesesCobro.value.length>0){
          this.totalValor= 0;   
          this.totalCantidad=0;
          for(let dato of this.datosP){
            for(let fecha of this.toppingsMesesCobro.value){
              if(dato.fechaCobro== fecha){
                this.totalValor= this.totalValor+ Number(dato.valorA);
                this.totalCantidad=this.totalCantidad+ Number(dato.cantidadA);
                this.datosPC= [ ...this.datosPC, { codigoTransaccion: dato.codigoTransaccion, fechaCobro: dato.fechaCobro, 
                  cantidad: this.formatoMiles(dato.cantidadA.toLocaleString('en-us')),
                  valor: this.formatoMiles('$'+dato.valorA.toLocaleString('en-us', {minimumFractionDigits: 2})), cantidadA: Number(dato.cantidadA), valorA: Number(dato.valorA)}  
                ];   
                this.datosExcelC= [ ...this.datosExcelC, { CodigoTransaccion: dato.codigoTransaccion, FechaCobro: dato.fechaCobro, 
                  Cantidad: dato.cantidadA, Valor: dato.valorA}  
                ];           
              }
            } 
          }
          this.datosP= this.datosPC;
          this.datosExcel=this.datosExcelC;
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
      this.alertService.warning("No se pudo cargar la información de excepciones a clientes: "+error);
      this.dataSource.data= [];
    });
  }

  cargarTodos(){
    this.spinner.show();
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//  
    this.dataSource = new ListacobrosDataSource();
    this.toppingsTransacciones = new FormControl(); 
    this.toppingsTransacciones.setValue([]);
    this.toppingsMesesCobro.setValue([]);
    this.recobrosService.findCobrosMes('').subscribe(data => {
      this.totalCantidad=0;
      this.totalValor=0;
      this.datosP=[];
      this.datosPC=[];
      this.datosExcel=[];
      this.datosExcelC=[];
      this.transacciones=[];
      this.mesesCobro=[];
      this.dataSource.data = this.datosP;   
      
      for(var _i=0 ; _i<data.length; _i++){
        this.totalCantidad= this.totalCantidad+ (data[_i])[2];
        this.totalValor= this.totalValor+ (data[_i])[3];
        this.datosP= [ ...this.datosP, { codigoTransaccion: (data[_i])[0], fechaCobro: (data[_i])[1],cantidad: this.formatoMiles((data[_i])[2].toLocaleString('en-us')), 
          valor: this.formatoMiles('$'+(data[_i])[3].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
        ];
        this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[0], FechaCobro: (data[_i])[1],Cantidad:(data[_i])[2], 
          Valor: (data[_i])[3]}  
        ];

        this.transacciones= [ ...this.transacciones, { cod: (data[_i])[0]}];
        this.mesesCobro= [ ...this.mesesCobro, { anoMes: (data[_i])[1]}]
      }

      //Se crea el array con los distintos códigos de transacción
      this.distinctTransacciones = this.transacciones.filter(
        (thing, i, arr) => arr.findIndex(t => t.cod === thing.cod) === i
      );
      //Ordena los segun el cod.
      var sortedArray1: { cod: number; }[] = this.distinctTransacciones.sort((n1,n2) => {
        if (n1.cod < n2.cod) {return -1;}    
        if (n1.cod > n2.cod) {return 1;}    
        return 0;
      });
      this.distinctTransacciones=sortedArray1;

      //Se crea el array con los distintos meses transacción
      this.mesesCobro = this.mesesCobro.filter(
        (thing, i, arr) => arr.findIndex(t => t.anoMes === thing.anoMes) === i
      );     

      //Ordena los segun el anoMes.
      var sortedArray2: { anoMes: string; }[] = this.mesesCobro.sort((n1,n2) => {
        if (n1.anoMes < n2.anoMes) {return 1;}    
        if (n1.anoMes > n2.anoMes) {return -1;}    
        return 0;
      });
      this.mesesCobro=sortedArray2;

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
      this.alertService.warning("No se pudo cargar la información: "+error);
      this.dataSource.data= [];
    });
  }
}
