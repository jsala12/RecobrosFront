import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';
import { recobrosServices } from 'src/app/service/recobro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import * as XLSX from 'xlsx'; 
import { registerLocaleData, formatDate } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO'; 

registerLocaleData(localeEsCo, 'es-CO');

@Component({
  selector: 'app-irrecudiario',
  templateUrl: './irrecudiario.component.html',
  styleUrls: ['./irrecudiario.component.css']
})
export class IrrecudiarioComponent implements OnInit {

  datosP=[];
  fechaCargue: any;
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
  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private spinner: NgxSpinnerService, private alertService: AlertService) {
  }

  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//  
    /*this.recobrosService.findIrrecuadiario('','','').subscribe(data => {      
      for(var _i=0 ; _i<data.length; _i++){
        if((data[_i])[6]==undefined){
          this.fechaCargue='';
        }else{
          this.fechaCargue= new Date((data[_i])[6]);
          this.fechaCargue.setMinutes(this.fechaCargue.getMinutes() + this.fechaCargue.getTimezoneOffset())
        }
        let fecha = new Date((data[_i])[0])
        fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        this.datosP= [ ...this.datosP, { fechaTransaccion: fecha, codigoTransaccion: (data[_i])[1], tipoCuenta: (data[_i])[2], 
          numeroCuenta: (data[_i])[3], valorRechazo: (data[_i])[4], codigoOficina: (data[_i])[5], fechaCargue: this.fechaCargue}  
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
    XLSX.writeFile(wb, 'Irrecudiario.xlsx');
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

    this.recobrosService.findIrrecuadiario(this.pickerInicio, this.pickerFin, this.codTransaccion).subscribe(data => {     
      this.datosP=[];
      
      for(var _i=0 ; _i<data.length; _i++){
        if((data[_i])[6]==undefined){
          this.fechaCargue='';
        }else{
          this.fechaCargue= new Date((data[_i])[6]);
          this.fechaCargue.setMinutes(this.fechaCargue.getMinutes() + this.fechaCargue.getTimezoneOffset())
        }
        let fecha = new Date((data[_i])[0])
        fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        this.datosP= [ ...this.datosP, { FechaRechazo: fecha, CodigoTransaccion: (data[_i])[1], TipoCuenta: (data[_i])[2], 
          NumeroCuenta: (data[_i])[3], ValorRechazo: (data[_i])[4], CodigoOficinaCuenta: (data[_i])[5], FechaCargue: this.fechaCargue}  
        ];
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
