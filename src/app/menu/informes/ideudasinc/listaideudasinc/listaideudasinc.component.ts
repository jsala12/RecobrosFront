import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListaideudasincDataSource, ListaideudasincItem } from './listaideudasinc-datasource';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';
import { recobrosServices } from 'src/app/service/recobro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import * as XLSX from 'xlsx'; 
import { FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/menu/configuraciones/excepciones/cliente/cliente.component';

@Component({
  selector: 'app-listaideudasinc',
  templateUrl: './listaideudasinc.component.html',
  styleUrls: ['./listaideudasinc.component.css']
})
export class ListaideudasincComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListaideudasincItem>;
  dataSource: ListaideudasincDataSource;
  toppingsMeses = new FormControl();
  matcher = new MyErrorStateMatcher();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codigoTransaccion', 'fechaRechazo', 'cantidad', 'valor', 'deudaActual'];
  datosP=[];
  datosExcel=[];
  meses=[];
  total: number;
  numeroFilas: number;
  valorEntero: any;
  valor: any;
  deudaActual: any;
  i: number;
  valorDecimal: any;
  totalCantidad: number;
  totalValor: number;
  totalDeudaActual: number;
  codTransaccion= '';
  fechaI: any;
  mesI: string;
  diaI: string;
  selectedMes: string;
  selected='';
  mesesL: number=0;

  constructor(public authService: AuthService, private global: Global,
    private recobrosService: recobrosServices, private spinner: NgxSpinnerService,
    private alertService: AlertService){

  }

  ngOnInit() {
    this.authService.actualizarSesion(this.global.timeOut);
    this.dataSource = new ListaideudasincDataSource();
    this.dataSource.data= this.datosP;/*
    this.recobrosService.findDeudasIncobrables(this.codTransaccion).subscribe(data => {
      
      this.totalCantidad=0;
      this.totalValor=0;
      this.totalDeudaActual = 0;
      
      for(var _i=0 ; _i<data.length; _i++){
        this.totalCantidad= this.totalCantidad+ (data[_i])[2];
        this.totalValor= this.totalValor+ (data[_i])[3];
        this.totalDeudaActual = this.totalDeudaActual+ (data[_i])[4];
        this.datosP= [ ...this.datosP, { codigoTransaccion: (data[_i])[0], fechaRechazo: (data[_i])[1],
          cantidad: this.formatoMiles((data[_i])[2].toLocaleString('en-us')), 
          valor: this.formatoMiles('$'+(data[_i])[3].toLocaleString('en-us', {minimumFractionDigits: 2})),
          deudaActual: this.formatoMiles('$'+(data[_i])[4].toLocaleString('en-us', {minimumFractionDigits: 2}))}  
        ];
        this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[0], FechaRechazo: (data[_i])[1],
          Cantidad: (data[_i])[2], Valor: (data[_i])[3], DeudaActual: (data[_i])[4]}  
        ];
        this.meses = [...this.meses, { anoMes: (data[_i])[1] }];
        this.mesesL= this.meses.length;
      }

      this.dataSource.data=  this.datosP;
      this.numeroFilas= this.dataSource.data.length;
      this.totalCantidad= this.formatoMiles(this.totalCantidad.toLocaleString('en-us'));
      this.totalValor= this.formatoMiles('$'+this.totalValor.toLocaleString('en-us', {minimumFractionDigits: 2}));
      this.totalDeudaActual= this.formatoMiles('$'+this.totalDeudaActual.toLocaleString('en-us', {minimumFractionDigits: 2}));

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
    XLSX.writeFile(wb, 'InformeIncobrables.xlsx');
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
    this.authService.actualizarSesion(this.global.timeOut);    
    this.spinner.show();

    this.dataSource = new ListaideudasincDataSource();

    this.codTransaccion = (<HTMLInputElement>document.getElementById("codTransaccion")).value;
    this.selectedMes= this.selected;
    this.toppingsMeses.setValue(null);
    this.recobrosService.findDeudasIncobrables(this.codTransaccion).subscribe(data => {      
      this.datosP=[];
      this.datosExcel=[];
      this.dataSource.data = this.datosP;
      
      this.total= 0;
      this.numeroFilas= 0;
      this.totalCantidad = 0;
      this.totalValor = 0;
      this.totalDeudaActual = 0;
      this.meses=[];
      
      if (data.length != 0) {
        for (var _i = 0; _i < data.length; _i++) {
          if(this.toppingsMeses.value == null){
            this.totalCantidad = this.totalCantidad + (data[_i])[2];
            this.totalValor = this.totalValor + (data[_i])[3];
            this.totalDeudaActual = this.totalDeudaActual + (data[_i])[4];
            this.datosP = [...this.datosP, {
              codigoTransaccion: (data[_i])[0], fechaRechazo: (data[_i])[1],
              cantidad: this.formatoMiles((data[_i])[2].toLocaleString('en-us')),
              valor: this.formatoMiles('$' + (data[_i])[3].toLocaleString('en-us', { minimumFractionDigits: 2 })),
              deudaActual: this.formatoMiles('$' + (data[_i])[4].toLocaleString('en-us', { minimumFractionDigits: 2 }))}];
            this.meses = [...this.meses, { anoMes: (data[_i])[1] }];
            this.mesesL= this.meses.length;
            this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[0], FechaRechazo: (data[_i])[1],
              Cantidad: (data[_i])[2], Valor: (data[_i])[3], DeudaActual: (data[_i])[4]}  
            ];
            
          }else{
            for (let mes of this.toppingsMeses.value) {            
              if ((data[_i])[1] == mes) {
                this.totalCantidad = this.totalCantidad + (data[_i])[2];
                this.totalValor = this.totalValor + (data[_i])[3];
                this.totalDeudaActual = this.totalDeudaActual + (data[_i])[4];
                this.datosP = [...this.datosP, {
                  codigoTransaccion: (data[_i])[0], fechaRechazo: (data[_i])[1],
                  cantidad: this.formatoMiles((data[_i])[2].toLocaleString('en-us')),
                  valor: this.formatoMiles('$' + (data[_i])[3].toLocaleString('en-us', { minimumFractionDigits: 2 })),
                  deudaActual: this.formatoMiles('$' + (data[_i])[4].toLocaleString('en-us', { minimumFractionDigits: 2 }))}];
                this.datosExcel= [ ...this.datosExcel, { CodigoTransaccion: (data[_i])[0], FechaRechazo: (data[_i])[1],
                  Cantidad: (data[_i])[2], Valor: (data[_i])[3], DeudaActual: (data[_i])[4]}  
                ];
              }
            }
          }
        }
      }
    
    this.dataSource.sort = this.sort;
    this.paginator.firstPage();
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;      
    this.dataSource.data.push(...this.datosP);

    this.numeroFilas= this.dataSource.data.length;
    this.totalCantidad= this.formatoMiles(this.totalCantidad.toLocaleString('en-us'));
    this.totalValor= this.formatoMiles('$'+this.totalValor.toLocaleString('en-us', {minimumFractionDigits: 2}));
    this.totalDeudaActual= this.formatoMiles('$'+this.totalDeudaActual.toLocaleString('en-us', {minimumFractionDigits: 2}));

    this.spinner.hide();

    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información: "+error);
      this.dataSource.data= [];
    });
  }

  cargarTodos(){
    this.spinner.show();    
    this.authService.actualizarSesion(this.global.timeOut);

    this.dataSource = new ListaideudasincDataSource();
    this.toppingsMeses = new FormControl(); 
    this.toppingsMeses.setValue([]);

    this.recobrosService.findDeudasIncobrables(this.codTransaccion).subscribe(data => {
      this.totalCantidad= 0;
      this.totalValor= 0; 
      this.totalDeudaActual = 0;  
      this.datosP=[];
      this.dataSource.data = this.datosP;   

      for(var _i=0 ; _i<data.length; _i++){
        this.totalCantidad= this.totalCantidad+ (data[_i])[2];
        this.totalValor= this.totalValor+ (data[_i])[3];
        this.totalDeudaActual= this.totalDeudaActual+ (data[_i])[4];
        this.datosP = [...this.datosP, {
          codigoTransaccion: (data[_i])[0], fechaRechazo: (data[_i])[1],
          cantidad: this.formatoMiles((data[_i])[2].toLocaleString('en-us')),
          valor: this.formatoMiles('$' + (data[_i])[3].toLocaleString('en-us', { minimumFractionDigits: 2 })),
          deudaActual: this.formatoMiles('$' + (data[_i])[4].toLocaleString('en-us', { minimumFractionDigits: 2 }))
        }];

        this.meses= [ ...this.meses, { anoMes: (data[_i])[1]}  
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
      this.totalDeudaActual= this.formatoMiles('$'+this.totalDeudaActual.toLocaleString('en-us', {minimumFractionDigits: 2}));
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de cobros creados por mes:  "+error);
      this.dataSource.data= [];
    });
  }
}
