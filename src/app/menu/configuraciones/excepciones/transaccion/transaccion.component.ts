import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { TransaccionDataSource, TransaccionItem } from './transaccion-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import { AlertService } from 'ngx-alerts';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MyErrorStateMatcher } from '../cliente/cliente.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from 'src/app/global';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements AfterViewInit, OnInit {
  detalleTransaccionControl = new FormControl('', [Validators.required,]); 
  estadoTransaccionControl = new FormControl('', [Validators.required,]); 
  codigoTransaccionControl = new FormControl('', [Validators.required,]); 
  detalleTransaccionControlEditar = new FormControl('', [Validators.required,]); 
  estadoTransaccionControlEditar = new FormControl('', [Validators.required,]); 
  codigoTransaccionControlEditar = new FormControl('', [Validators.required,]); 
  autorizaControl = new FormControl('', [Validators.required,]); 
  matcher = new MyErrorStateMatcher();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<TransaccionItem>;
  dataSource: TransaccionDataSource;

  datosP=[];
  codigosTransaccion=[];
  headerModal;
  estadoTransaccionSelected;
  codigoT;
  detalle;
  selectedTransaccion;
  usrautoriza: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codigo', 'detalle', 'fechaCreacion', 'usrautoriza', 'estado', 'editar', 'eliminar'];

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private alertService: AlertService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.dataSource = new TransaccionDataSource();
    this.recobrosService.findConfExcepcionadoTransaccion().subscribe(data => {
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { codigo: (data[_i])["codigoExcepcion"], 
                          detalle: (data[_i])["detalle"], 
                          estado:  ((data[_i])["codigoEstadoExcepcion"])["nombre"],
                          fechaCreacion: (data[_i])["fechacreacion"], 
                          usrautoriza: (data[_i])["usrautoriza"]}  
        ];
      }
      this.dataSource.data=  this.datosP;
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de excepciones a transacciones: "+error);
      this.dataSource.data= [];
    });

    this.recobrosService.findListaTransacciones().subscribe(data => {
      for(var _i=0 ; _i<data.length; _i++){
      this.codigosTransaccion=[ ...this.codigosTransaccion, { codigo: data[_i][0], 
      nombre: data[_i][1] }  
      ];
    }
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de excepciones a transacciones: "+error);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  agregarRegistro(){    
    this.detalleTransaccionControl = new FormControl('', [Validators.required,]); 
    this.estadoTransaccionControl = new FormControl('', [Validators.required,]);
    this.codigoTransaccionControl = new FormControl('', [Validators.required,]);
    this.autorizaControl = new FormControl('', [Validators.required,]);    
    this.headerModal="Agregar excepción a transacción";
    this.estadoTransaccionSelected=null;
    this.usrautoriza='';
    (<HTMLInputElement>document.getElementById("numCuenta")).value=null;
    (<HTMLInputElement>document.getElementById("detalleCuentaI")).value=null;
    (<HTMLInputElement>document.getElementById("usrautorizaI")).value='';
  }

  editarRegistro(row){
    this.headerModal="Editar excepción a transacción";
    if(row.estado=="ACTIVO"){
      this.estadoTransaccionSelected=1;
    }else{
      this.estadoTransaccionSelected=2;
    }
    this.codigoT= row.codigo;
    this.selectedTransaccion= row.codigo;
    this.detalle=row.detalle;
    this.usrautoriza= row.usrautoriza;

    this.detalleTransaccionControlEditar = new FormControl(this.detalle, [Validators.required,]);
    this.estadoTransaccionControlEditar = new FormControl(this.estadoTransaccionSelected, [Validators.required,]);
    this.codigoTransaccionControlEditar = new FormControl(this.codigoT, [Validators.required,]);
  }

  eliminarRegistro(row){
    this.headerModal="Eliminar excepción a transacción";
    this.codigoT=row.codigo;
    this.usrautoriza=row.usrautoriza;
  }

  filtrarTabla(){
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.spinner.show();
    this.dataSource = new TransaccionDataSource();
    this.recobrosService.findConfExcepcionadoTransaccion().subscribe(data => {
      this.datosP=[];
      this.dataSource.data = this.datosP;
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { codigo: (data[_i])["codigoExcepcion"], 
                      detalle: (data[_i])["detalle"], 
                      estado:  ((data[_i])["codigoEstadoExcepcion"])["nombre"],
                      fechaCreacion: (data[_i])["fechacreacion"], 
                      usrautoriza: (data[_i])["usrautoriza"]}  
        ];
      }
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.dataSource.data.push(...this.datosP);
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de excepciones a transacciones: "+error);
      this.dataSource.data= [];
    });
  }

  operacionRegistro(opcion: number, id, detalleTransaccion, autoriza){
    if(opcion==1){ //Editar     
     this.recobrosService.EditTransaccion(this.selectedTransaccion, this.estadoTransaccionSelected, detalleTransaccion).subscribe(data => {   
      if(data==null){
         this.alertService.danger("Falló la conexión con el origen de datos.");
       }else{
         if(data["exitoso"]!==undefined){
           this.alertService.success(data["exitoso"]);
         }else{
           this.alertService.danger(data["error"]);
         }
       }
       this.recobrosService.saveLog('Configuración -> Excepciones -> Transacción', this.global.detalles_excepciones_transaccion[1] +this.codigoT, this.global.login, 'Editar').subscribe(data => {});  
       this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Transacción', this.global.detalles_excepciones_transaccion[1] +this.codigoT, this.global.login, 'Editar', autoriza).subscribe(data => {
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
      this.alertService.warning("No se pudo editar la excepción a la transacción: "+error);
    });

    }else if(opcion==2){ //Eliminar
     this.recobrosService.DeleteTransaccion(this.codigoT).subscribe(data => {
      if(data==null){
         this.alertService.danger("Falló la conexión con el origen de datos.");
       }else{
         if(data["exitoso"]!==undefined){
           this.alertService.success(data["exitoso"]);
         }else{
           this.alertService.danger(data["error"]);
         }
       }
       this.recobrosService.saveLog('Configuración -> Excepciones -> Transacción', this.global.detalles_excepciones_transaccion[2] +this.codigoT, this.global.login, 'Eliminar').subscribe(data => {});
       this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Transacción', this.global.detalles_excepciones_transaccion[2] +this.codigoT, this.global.login, 'Eliminar', this.usrautoriza).subscribe(data => {
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
      this.alertService.warning("No se pudo eliminar la excepción a la transacción: "+error);
    });
    }else if(opcion==3){ //Guardar
     this.recobrosService.SaveTransaccion(this.selectedTransaccion, this.estadoTransaccionSelected, detalleTransaccion, autoriza).subscribe(data => {
      if(data==null){
         this.alertService.danger("Falló la conexión con el origen de datos.");
       }else{
         if(data["exitoso"]!==undefined){
           this.alertService.success(data["exitoso"]);
         }else{
           this.alertService.danger(data["error"]);
         }
       }  
       this.recobrosService.saveLog('Configuración -> Excepciones -> Transacción', this.global.detalles_excepciones_transaccion[0] +this.selectedTransaccion+", "+detalleTransaccion, this.global.login, 'Crear').subscribe(data => {});    
       this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Transacción', this.global.detalles_excepciones_transaccion[0]+this.selectedTransaccion+", " +detalleTransaccion, this.global.login, 'Crear', autoriza).subscribe(data => {
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
        this.alertService.warning("No se pudo guardar la excepción a la transacción: "+error);
    });
    }   
  }
}
