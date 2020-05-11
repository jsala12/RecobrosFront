import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatSelect, MatIconRegistry } from '@angular/material';
import { ClienteDataSource, ClienteItem } from './cliente-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import * as $ from "jquery";
import { AlertService } from 'ngx-alerts';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from 'src/app/global';
import AutoNumeric from 'autonumeric'; 
import { AuthService } from 'src/app/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

/*interface JQuery{
      autoNumeric:any;
  } 

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements AfterViewInit, OnInit {  
  numeroDocumentoControl = new FormControl('', [Validators.required,]);
  tipoDocumentoControl = new FormControl('', [Validators.required,]); 
  detalleClienteControl = new FormControl('', [Validators.required,]); 
  autorizaControl = new FormControl('', [Validators.required,]); 
  estadoClienteControl = new FormControl('', [Validators.required,]); 
  numeroDocumentoControlEditar = new FormControl('', [Validators.required,]);
  tipoDocumentoControlEditar = new FormControl('', [Validators.required,]); 
  detalleClienteControlEditar = new FormControl('', [Validators.required,]); 
  estadoClienteControlEditar = new FormControl('', [Validators.required,]); 

  
  matcher = new MyErrorStateMatcher();
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ClienteItem>;
  @ViewChild(MatSelect, {static: false}) select: MatSelect;
  dataSource: ClienteDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['documento', 'tipo', 'detalle', 'fechaCreacion', 'usrautoriza', 'estado', 'editar', 'eliminar'];

  datosP=[];
  tipoClientes = [];
  selected='1';
  seleccionadoTipoDoc : number;
  headerModal: string;
  estadoCliente;
  detalleCliente;
  usrautoriza;
  documentoCliente;
  tipoDocumento;
  estadoClienteSelected;
  selectedTipoDocumento;
  alert;
  numDocumentoD;
  detalleClienteD;
  index: number;
  longitudNumDoc: string;
  i: number;
  files: any;
  srcResult;

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private alertService: AlertService, private spinner: NgxSpinnerService) {
      this.matIconRegistry.addSvgIcon(
        'close_custom',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/close.svg')
      )
    }

  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------// 
    this.dataSource = new ClienteDataSource();
    this.recobrosService.findConfExcepcionadoTipoDCliente().subscribe(data => {
      this.tipoClientes = data;
    }, error => { 
      this.alertService.warning("No se pudieron cargar los tipos de documento");
    });  
    this.recobrosService.findConfExcepcionadoCliente(1).subscribe(data => {
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { documento: (data[_i])["codigoArchivoDiario"], 
                          tipo: ((data[_i])["codigoTipoDocumento"])["detalle"] , detalle:  ((data[_i])["detalle"]), 
          estado: ((data[_i])["codigoEstadoExcepcion"])["nombre"], fechaCreacion: (data[_i])["fechacreacion"], 
          usrautoriza: (data[_i])["usrautoriza"]}  
        ];
      }
      this.dataSource.data=  this.datosP;
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de excepciones a clientes: "+error);
      this.dataSource.data= [];
    }); 
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.spinner.hide();
  }

  filtrarTabla(){
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------// 
    this.spinner.show();
    this.dataSource = new ClienteDataSource();
    this.seleccionadoTipoDoc=+this.selected;
    this.recobrosService.findConfExcepcionadoCliente(this.seleccionadoTipoDoc).subscribe(data => {
      this.datosP=[];
      this.dataSource.data = this.datosP;
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { documento: (data[_i])["codigoArchivoDiario"], 
                          tipo: ((data[_i])["codigoTipoDocumento"])["detalle"] , detalle:  ((data[_i])["detalle"]), 
          estado: ((data[_i])["codigoEstadoExcepcion"])["nombre"], fechaCreacion: (data[_i])["fechacreacion"], 
          usrautoriza: (data[_i])["usrautoriza"]}  
        ];
      }
      this.dataSource.sort = this.sort;
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;      
      this.table.dataSource = this.dataSource;
      this.dataSource.data.push(...this.datosP);
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de excepciones a clientes: "+error);
      this.dataSource.data= [];
    });
  }

  agregarRegistro(){  
    this.numeroDocumentoControl = new FormControl('', [Validators.required,]);
    this.tipoDocumentoControl.setErrors({'required': false});
    this.detalleClienteControl = new FormControl('', [Validators.required,]); 
    this.estadoClienteControl = new FormControl('', [Validators.required,]);
    this.autorizaControl = new FormControl('', [Validators.required,]);
    this.usrautoriza=null;        
    this.headerModal="Agregar excepción cliente";
    this.estadoClienteSelected=null;
    this.selectedTipoDocumento= this.selected;
    (<HTMLInputElement>document.getElementById("numDocumento")).value=null;
    (<HTMLInputElement>document.getElementById("detalleClienteI")).value=null;
    (<HTMLInputElement>document.getElementById("usrautorizaI")).value=null;
  }

  agregarRegistroMasivo(){         
    this.headerModal="Agregar excepciones masivas";    
  }

  editarRegistro(row){
    this.headerModal="Editar excepción cliente";
    this.estadoCliente=row.estado;
    if(row.estado=="ACTIVO"){
      this.estadoClienteSelected=1;
    }else{
      this.estadoClienteSelected=2;
    }

    this.selectedTipoDocumento=this.selected;  
    this.detalleCliente=row.detalle;
    this.tipoDocumento=row.tipo;
    this.documentoCliente=row.documento;
    this.usrautoriza= row.usrautoriza;

    this.numeroDocumentoControlEditar = new FormControl(this.documentoCliente, [Validators.required,]);
    this.tipoDocumentoControlEditar = new FormControl(this.selectedTipoDocumento, [Validators.required,]);
    this.detalleClienteControlEditar = new FormControl(this.detalleCliente, [Validators.required,]);
    this.estadoClienteControlEditar = new FormControl(this.estadoClienteSelected, [Validators.required,]);
  }

  eliminarRegistro(row){
    this.headerModal="Eliminar excepción cliente";
    this.documentoCliente=row.documento;
    this.usrautoriza= row.usrautoriza;
  }

 operacionRegistro(opcion: number, numeroDocumento, detalleClienteA, autoriza){  
   if(opcion==1){ //Editar
    this.recobrosService.EditClienteExcepcionado(this.documentoCliente,this.selectedTipoDocumento, detalleClienteA, this.estadoClienteSelected).subscribe(data => { 
      if(data==null){
        this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
        if(data["exitoso"]!==undefined){
          this.alertService.success(data["exitoso"]);
        }else{
          this.alertService.danger(data["error"]);
        }
      }  
      this.recobrosService.saveLog('Configuración -> Excepciones -> Cliente', this.global.detalles_excepciones_cliente[1] +this.documentoCliente, this.global.login, 'Editar').subscribe(data => {});  
      this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Cliente', this.global.detalles_excepciones_cliente[1] +this.documentoCliente, this.global.login, 'Editar', autoriza).subscribe(data => {
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
      this.alertService.warning("No se pudo editar la excepción del cliente: "+error);
    });
   }else if(opcion==2){ //Eliminar
    this.recobrosService.DeleteClienteExcepcionado(this.documentoCliente).subscribe(data => {                 
      if(data==null){
        this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
        if(data["exitoso"]!==undefined){
          this.alertService.success(data["exitoso"]);
        }else{
          this.alertService.danger(data["error"]);
        }
      }      
      this.recobrosService.saveLog('Configuración -> Excepciones -> Cliente', this.global.detalles_excepciones_cliente[2] +this.documentoCliente, this.global.login, 'Eliminar').subscribe(data => {});
      this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Cliente', this.global.detalles_excepciones_cliente[2] +this.documentoCliente, this.global.login, 'Eliminar', this.usrautoriza).subscribe(data => {
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
      this.alertService.warning("No se pudo eliminar la excepción del cliente: "+error);
    });
   }else if(opcion==3){ //Guardar
    while(numeroDocumento.length<10){
      numeroDocumento="0"+numeroDocumento;
    }
    this.recobrosService.SaveClienteExcepcionado(numeroDocumento, this.selectedTipoDocumento, detalleClienteA, this.estadoClienteSelected, autoriza).subscribe(data => {
      if(data==null){
        this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
        if(data["exitoso"]!==undefined){
          this.alertService.success(data["exitoso"]);
        }else{
          this.alertService.danger(data["error"]);
        }
      }         
      this.recobrosService.saveLog('Configuración -> Excepciones -> Cliente', this.global.detalles_excepciones_cliente[0] + numeroDocumento,this.global.login, 'Crear').subscribe(data => {}); 
      this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Cliente', this.global.detalles_excepciones_cliente[0] + numeroDocumento,this.global.login, 'Crear', autoriza).subscribe(data => {
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
      this.alertService.warning("No se pudo guardar la excepción del cliente: "+error);
    });
   }   
 }  

 onUploadClicked($event){
  this.alertService.success("Cargó el archivo");
  console.log($event);
 }
 onSelectedFilesChanged($event){
  this.alertService.success("Seleccionó el archivo");
  console.log($event);
 }

 onFileSelected() {
  const inputNode: any = document.querySelector('#file');

  if (typeof (FileReader) !== 'undefined') {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.srcResult = e.target.result;
    };

    reader.readAsArrayBuffer(inputNode.files[0]);
    console.log(reader);
  }
}
}
