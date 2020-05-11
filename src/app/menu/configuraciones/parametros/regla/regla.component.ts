import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ReglaDataSource, ReglaItem } from './regla-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import { AlertService } from 'ngx-alerts';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from 'src/app/global';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-regla',
  templateUrl: './regla.component.html',
  styleUrls: ['./regla.component.css']
})
export class ReglaComponent implements AfterViewInit, OnInit {
  descripcionParametroControl = new FormControl('', [Validators.required,]);
  valorCampoParametroControl = new FormControl('', [Validators.required,]); 
  nombreParametroControl = new FormControl('', [Validators.required,]); 
  descripcionParametroControlEditar = new FormControl('', [Validators.required,]); 
  valorCampoParametroControlEditar = new FormControl('', [Validators.required,]);
  nombreParametroControlEditar = new FormControl('', [Validators.required,]); 

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ReglaItem>;
  dataSource: ReglaDataSource;

  datosP=[];
  descripcionParametro;
  valorCampoParametro;
  nombreParametro;
  headerModal: string;
  idParametro: any;
  matcher;
  valorCampo;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombreRegla', 'valorRegla', 'descripcion', 'editar', 'eliminar'];
  
  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private alertService: AlertService, private spinner: NgxSpinnerService) {
  }
  
  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.dataSource = new ReglaDataSource();
    this.recobrosService.findConfParametroApp().subscribe(data => {
      
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { id: (data[_i])["codigoParametro"], nombreRegla: (data[_i])["nombre"], 
                          valorRegla: (data[_i])["valorCampo"] , descripcion:  ((data[_i])["descripcion"])}  
        ];
      }
      this.dataSource.data=  this.datosP;
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de los parámetros de la app: "+error);
      this.dataSource.data= [];
    }); 
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  filtrarTabla(){
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.spinner.show();
    this.dataSource = new ReglaDataSource();
    this.recobrosService.findConfParametroApp().subscribe(data => {
         
      this.datosP=[];
      this.dataSource.data = this.datosP;
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { id: (data[_i])["codigoParametro"], nombreRegla: (data[_i])["nombre"], 
                          valorRegla: (data[_i])["valorCampo"] , descripcion:  ((data[_i])["descripcion"])}  
        ];
      }
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.dataSource.data.push(...this.datosP);
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de los parámetros de la app: "+error);
    }); 
  }

  agregarRegistro(){  
    this.descripcionParametroControl= new FormControl('', [Validators.required,]);
    this.valorCampoParametroControl= new FormControl('', [Validators.required,]);
    this.nombreParametroControl= new FormControl('', [Validators.required,]);
        
    this.headerModal="Agregar parámetro a recobros";
    (<HTMLInputElement>document.getElementById("descripcionParametroI")).value=null;
    (<HTMLInputElement>document.getElementById("valorPrametroI")).value=null;
    (<HTMLInputElement>document.getElementById("nombreParametroI")).value=null;
  }

  editarRegistro(row){
    this.headerModal="Editar parámetro a recobros";
    this.idParametro= row.id;
    this.descripcionParametro= row.descripcion;  
    this.valorCampoParametro= row.valorRegla;
    this.nombreParametro=row.nombreRegla;

    this.descripcionParametroControlEditar = new FormControl(this.descripcionParametro, [Validators.required,]);
    this.valorCampoParametroControlEditar = new FormControl(this.valorCampoParametro, [Validators.required,]);
    this.nombreParametroControlEditar = new FormControl(this.nombreParametro, [Validators.required,]);
  }

  eliminarRegistro(row){
    this.headerModal="Eliminar parámetro de recobros";
    this.idParametro= row.id;
    this.nombreParametro= row.nombreRegla;
  }

  operacionRegistro(opcion: number, descripcionParametroA, valorCampoA, nombreParametroA){
    if(opcion==1){ //Editar
     this.recobrosService.EditConfParametro(this.idParametro, descripcionParametroA, valorCampoA, nombreParametroA).subscribe(data => {
      if(data==null){
         this.alertService.danger("Falló la conexión con el origen de datos.");
       }else{
         if(data["exitoso"]!==undefined){
           this.alertService.success(data["exitoso"]);
         }else{
           this.alertService.danger(data["error"]);
         }
       }
       this.recobrosService.saveLog('Configuración -> Parámetros App', this.global.detalles_parametros_app[1] +this.nombreParametro, this.global.login, 'Editar').subscribe(data => {});  
       this.recobrosService.enviarNotificacion('Configuración -> Parámetros App', this.global.detalles_parametros_app[1] +this.nombreParametro  +" con valor "+ valorCampoA, this.global.login, 'Editar', 'No hay datos').subscribe(data => {
        if(data==null){
          this.alertService.danger("Falló la conexión con el origen de datos.");
        }else{
          if(data["exitoso"]!==undefined){
            console.log(data["exitoso"]);
          }else{
            console.log(data["error"]);
          }
        } 
      }, error=>{
        console.log("No se pudo enviar el correo: "+ error);
      }); 
      this.filtrarTabla();
      }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo editar parámetro de la app: "+error);
    }); 
    
    }else if(opcion==2){ //Eliminar
     this.recobrosService.DeleteConfParametro(this.idParametro).subscribe(data => {             
      if(data==null){
         this.alertService.danger("Falló la conexión con el origen de datos.");
       }else{
         if(data["exitoso"]!==undefined){
           this.alertService.success(data["exitoso"]);
         }else{
           this.alertService.danger(data["error"]);
         }
       }
       this.recobrosService.saveLog('Configuración -> Parámetros App', this.global.detalles_parametros_app[2] +this.nombreParametro, this.global.login, 'Eliminar').subscribe(data => {});  
       this.recobrosService.enviarNotificacion('Configuración -> Parámetros App', this.global.detalles_parametros_app[2] +this.nombreParametro, this.global.login, 'Eliminar', 'No hay datos').subscribe(data => {
        if(data==null){
          this.alertService.danger("Falló la conexión con el origen de datos.");
        }else{
          if(data["exitoso"]!==undefined){
            console.log(data["exitoso"]);
          }else{
            console.log(data["error"]);
          }
        } 
      }, error=>{
        console.log("No se pudo enviar el correo: "+ error);
      }); 
      this.filtrarTabla();
      }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo eliminar parámetro de la app: "+error);
    });
    }else if(opcion==3){ //Guardar
     this.recobrosService.SaveConfParametro(descripcionParametroA, valorCampoA, nombreParametroA).subscribe(data => {    
      if(data==null){
         this.alertService.danger("Falló la conexión con el origen de datos.");
       }else{
         if(data["exitoso"]!==undefined){
           this.alertService.success(data["exitoso"]);
         }else{
           this.alertService.danger(data["error"]);
         }
       }    
       this.recobrosService.saveLog('Configuración -> Parámetros App', this.global.detalles_parametros_app[0] +nombreParametroA, this.global.login, 'Crear').subscribe(data => {});    
       this.recobrosService.enviarNotificacion('Configuración -> Parámetros App', this.global.detalles_parametros_app[0] +nombreParametroA  +" con valor "+ valorCampoA, this.global.login, 'Crear', 'No hay datos').subscribe(data => {
        if(data==null){
          this.alertService.danger("Falló la conexión con el origen de datos.");
        }else{
          if(data["exitoso"]!==undefined){
            console.log(data["exitoso"]);
          }else{
            console.log(data["error"]);
          }
        } 
      }, error=>{
        console.log("No se pudo enviar el correo: "+ error);
      }); 
      this.filtrarTabla();
      }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo guardar parámetro de la app: "+error);
    });
    }   
  }  
}
