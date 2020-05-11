import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { CuentaDataSource, CuentaItem } from './cuenta-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import { AlertService } from 'ngx-alerts';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MyErrorStateMatcher } from '../cliente/cliente.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from 'src/app/global';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements AfterViewInit, OnInit {
  
  numeroCuentaControl = new FormControl('', [Validators.required,]);
  tipoProductoControl = new FormControl('', [Validators.required,]); 
  detalleCuentaControl = new FormControl('', [Validators.required,]); 
  estadoCuentaControl = new FormControl('', [Validators.required,]); 
  autorizaControl = new FormControl('', [Validators.required,]); 
  numeroCuentaControlEditar = new FormControl('', [Validators.required,]);
  tipoProductoControlEditar = new FormControl('', [Validators.required,]); 
  detalleCuentaControlEditar = new FormControl('', [Validators.required,]); 
  estadoCuentaControlEditar = new FormControl('', [Validators.required,]); 
  matcher = new MyErrorStateMatcher();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<CuentaItem>;
  dataSource: CuentaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'numeroCuenta', 'codigoProducto', 'tipo', 'detalle', 'fechaCreacion', 'usrautoriza', 'estado', 'editar', 'eliminar'];

  datosP=[];
  tipoProductos = [];
  headerModal: string;
  estadoCuenta;
  selectedTipoProducto;
  estadoCuentaSelected;
  detalleCuenta;
  cuenta;
  idCuenta;
  tipoProducto;
  length;
  id;
  detalleD;
  usrautoriza: any;

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private alertService: AlertService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {    
    this.dataSource = new CuentaDataSource();    
    this.recobrosService.findConfExcepcionadoListaTipoProducto().subscribe(data => {
      this.tipoProductos = data;    
    });
    this.recobrosService.findConfExcepcionadoCuenta().subscribe(data => {      
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { id: (data[_i])["codigoExcepcionCuenta"], 
                          numeroCuenta: (data[_i])["numeroCuenta"], codigoProducto:  (data[_i])["codigoProducto"]["id"]["codigoProducto"], 
                         tipo: (data[_i])["tipoProducto"],  nombre: (data[_i])["codigoProducto"]["nombre"], detalle: (data[_i])["detalle"],
                         estado: ((data[_i])["codigoEstadoExcepcion"])["nombre"], 
                         fechaCreacion: (data[_i])["fechacreacion"], 
                         usrautoriza: (data[_i])["usrautoriza"]}  
        ];
      }
      this.dataSource.data=  this.datosP;
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de excepciones a cuentas: "+error);
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
    this.dataSource = new CuentaDataSource();
    this.recobrosService.findConfExcepcionadoCuenta().subscribe(data => {
      this.datosP=[];
      this.dataSource.data = this.datosP;
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { id: (data[_i])["codigoExcepcionCuenta"], 
          numeroCuenta: (data[_i])["numeroCuenta"], codigoProducto:  (data[_i])["codigoProducto"]["id"]["codigoProducto"], 
          tipo: (data[_i])["tipoProducto"],  nombre: (data[_i])["codigoProducto"]["nombre"], 
          detalle: (data[_i])["detalle"], 
          estado: ((data[_i])["codigoEstadoExcepcion"])["nombre"], 
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
      this.alertService.warning("No se pudo cargar la información de excepciones a cuentas: "+error);
      this.dataSource.data= [];
    });
  }

  agregarRegistro(){    
    this.numeroCuentaControl = new FormControl('', [Validators.required]);
    this.tipoProductoControl = new FormControl('', [Validators.required,]); 
    this.detalleCuentaControl = new FormControl('', [Validators.required,]); 
    this.estadoCuentaControl = new FormControl('', [Validators.required,]);
    this.autorizaControl = new FormControl('', [Validators.required,]);
    this.usrautoriza=null;
    this.headerModal="Agregar excepción a cuenta";
    this.estadoCuentaSelected=null;
    this.selectedTipoProducto= null;
    (<HTMLInputElement>document.getElementById("numCuenta")).value=null;
    (<HTMLInputElement>document.getElementById("detalleCuentaI")).value=null;
    (<HTMLInputElement>document.getElementById("usrautorizaI")).value=null;
  }

  editarRegistro(row){
    this.headerModal="Editar excepción a cuenta";
    this.estadoCuenta=row.estado;
    if(row.estado=="ACTIVO"){
      this.estadoCuentaSelected=1;
    }else{
      this.estadoCuentaSelected=2;
    }

    this.idCuenta=row.id;
    this.detalleCuenta=row.detalle;
    this.selectedTipoProducto=row.nombre;
    this.cuenta=row.numeroCuenta;
    this.usrautoriza= row.usrautoriza;

    this.numeroCuentaControlEditar = new FormControl(this.idCuenta, [Validators.required,]);
    this.tipoProductoControlEditar = new FormControl(this.selectedTipoProducto, [Validators.required,]);
    this.detalleCuentaControlEditar = new FormControl(this.detalleCuenta, [Validators.required,]);
    this.estadoCuentaControlEditar = new FormControl(this.estadoCuentaSelected, [Validators.required,]);
  }

  eliminarRegistro(row){
    this.headerModal="Eliminar excepción a cuenta";
    this.cuenta=row.numeroCuenta;
    this.idCuenta= row.id;
    this.usrautoriza= row.usrautoriza;
  }

  operacionRegistro(opcion: number, idCuentaA, numCuenta, detalleCuentaA, autoriza){
    this.spinner.show();
    while(numCuenta.length<9){
      numCuenta="0"+numCuenta;
    }
    if(opcion==1){ //Editar
     this.recobrosService.EditCuentaExcepcionada(idCuentaA, this.cuenta,this.selectedTipoProducto, detalleCuentaA, this.estadoCuentaSelected).subscribe(data => {
      if(data==null){
        this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
        if(data["exitoso"]!==undefined){
          this.alertService.success(data["exitoso"]);
        }else{
          this.alertService.danger(data["error"]);
        }
      }
      this.recobrosService.saveLog('Configuración -> Excepciones -> Cuenta', this.global.detalles_excepciones_cuenta[1] +numCuenta, this.global.login, 'Editar').subscribe(data => {});  
      this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Cliente', this.global.detalles_excepciones_cliente[1] +numCuenta, this.global.login, 'Editar', autoriza).subscribe(data => {
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
      this.alertService.warning("No se pudo editar la excepción de la cuenta: "+error);
    });
    
    }else if(opcion==2){ //Eliminar
     this.recobrosService.DeleteCuentaExcepcionada(this.idCuenta).subscribe(data => {  
      if(data==null){
        this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
        if(data["exitoso"]!==undefined){
          this.alertService.success(data["exitoso"]);
        }else{
          this.alertService.danger(data["error"]);
        }
      }
      this.recobrosService.saveLog('Configuración -> Excepciones -> Cuenta', this.global.detalles_excepciones_cuenta[2] +numCuenta, this.global.login, 'Eliminar').subscribe(data => {});  
      this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Cuenta', this.global.detalles_excepciones_cliente[2] +numCuenta, this.global.login, 'Eliminar', this.usrautoriza).subscribe(data => {
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
      this.alertService.warning("No se pudo eliminar la excepción de la cuenta: "+error);
    });
    }else if(opcion==3){ //Guardar
     this.recobrosService.SaveCuentaExcepcionada(numCuenta,this.selectedTipoProducto, this.estadoCuentaSelected, detalleCuentaA, autoriza).subscribe(data => {
      if(data==null){
        this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
        if(data["exitoso"]!==undefined){
          this.alertService.success(data["exitoso"]);
        }else{
          this.alertService.danger(data["error"]);
        }
      }
      this.recobrosService.saveLog('Configuración -> Excepciones -> Cuenta', this.global.detalles_excepciones_cuenta[0] +numCuenta, this.global.login, 'Crear').subscribe(data => {});  
      this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Cuenta', this.global.detalles_excepciones_cliente[0] +numCuenta,this.global.login, 'Crear', autoriza).subscribe(data => {
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
      this.alertService.warning("No se pudo guardar la excepción de la cuenta: "+error);
    });
    }   
  } 
}
