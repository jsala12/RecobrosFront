import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';
import { recobrosServices } from 'src/app/service/recobro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import * as XLSX from 'xlsx'; 
import { registerLocaleData, formatDate } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR'; 

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['./deudas.component.css']
})
export class DeudasComponent implements OnInit {

  datosP=[];
  minDate = new Date(1990, 0, 1);
  maxDate = new Date();
  pickerInicio: string;
  pickerFin: string;
  codTransaccion: string='';
  codTransaccionA='';
  fechaI: any;
  mesI: string;
  diaI: string;
  fechaFinal=null;
  fechaInicial=null;
  fechaRechazo: any;
  estadoDeudas: string;
  incobrable: string;

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private spinner: NgxSpinnerService, private alertService: AlertService) {
  }
  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//  
    /*this.recobrosService.findDeudas('','','').subscribe(data => {
      for(var _i=0 ; _i<data.length; _i++){
        let fecha = new Date((data[_i])[0])
        fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        this.datosP= [ ...this.datosP, { fechaDeuda: fecha, valorDeuda: (data[_i])[1], valorDeudaActual: (data[_i])[2], 
          fechaRechazo: new Date((data[_i])[3]), estadoDeuda: (data[_i])[4], incobrable: (data[_i])[5], razonIncobrable: (data[_i])[6],
          codigoOficina: (data[_i])[7], saldoCanje: (data[_i])[8], codigoTransaccion: (data[_i])[9], tipoProducto: (data[_i])[10],
          numeroProducto: (data[_i])[11], tipoIdentidad: (data[_i])[12], numeroIdentidad: (data[_i])[13]}
        ];
      };
      this.spinner.hide(); 
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información: "+error);
    });*/
  }

  ExportTOExcel()  {
    this.spinner.show();
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.datosP);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    /* save to file */
    XLSX.writeFile(wb, 'Deudas.xlsx');
    this.spinner.hide();
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
    this.codTransaccionA= this.codTransaccion;

    this.recobrosService.findDeudas(this.pickerInicio, this.pickerFin, this.codTransaccion).subscribe(data => {  
      console.log(data);  
      this.datosP=[];
      
      for(var _i=0 ; _i<data.length; _i++){
        if((data[_i])[3]==undefined){
          this.fechaRechazo='';
        }else{
          this.fechaRechazo= new Date((data[_i])[3]);
          this.fechaRechazo.setMinutes(this.fechaRechazo.getMinutes() + this.fechaRechazo.getTimezoneOffset())
        }        

        if((data[_i])[4]=='1'){
          this.estadoDeudas='Pagada';
        }else{
          this.estadoDeudas='Pendiente';
        }
        if((data[_i])[5]=='1'){
          this.incobrable="Si";
        }else{
          this.incobrable="No";
        }
        let fecha = new Date((data[_i])[0])
        if((data[_i])[14]=='Activo'){(data[_i])[14]='Activa'}
        if((data[_i])[14]=='Inactivo'){(data[_i])[14]='Inactiva'}
        fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        this.datosP= [ ...this.datosP, { CodigoTransaccion: (data[_i])[9], FechaRechazo: this.fechaRechazo, FechaDeuda: fecha, TipoProducto: (data[_i])[10],
          NumeroCuentaDeuda: (data[_i])[11], EstadoActualCuenta: (data[_i])[14], SaldoActual: (data[_i])[15], codigoOficina: (data[_i])[7], 
          ValorDeuda: (data[_i])[1], ValorDeudaActual: (data[_i])[2], SaldoCanje: (data[_i])[8], EstadoDeuda: this.estadoDeudas, Incobrable: this.incobrable,
          RazonIncobrable: (data[_i])[6], TipoIdentidadCliente: (data[_i])[12],NumeroIdentidadCliente: (data[_i])[13]     
        }];
      };     
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.datosP=[];
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
