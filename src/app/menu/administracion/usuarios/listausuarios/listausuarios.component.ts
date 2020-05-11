import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListausuariosDataSource, ListausuariosItem } from './listausuarios-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import { AlertService } from 'ngx-alerts';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from 'src/app/global';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements AfterViewInit, OnInit {
  loginControl = new FormControl('', [Validators.required,]);
  nombreRolControl = new FormControl('', [Validators.required,]); 
  emailUsuarioControl = new FormControl('', [Validators.required, Validators.email]); 
  nombreUsuarioControl = new FormControl('', [Validators.required,]); 
  estadoUsuarioControl = new FormControl('', [Validators.required,]); 

  loginControlEditar = new FormControl('', [Validators.required,]);
  nombreRolControlEditar = new FormControl('', [Validators.required,]); 
  emailUsuarioControlEditar = new FormControl('', [Validators.required,]); 
  nombreUsuarioControlEditar = new FormControl('', [Validators.required,]); 
  estadoUsuarioControlEditar = new FormControl('', [Validators.required,]); 

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListausuariosItem>;
  dataSource: ListausuariosDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['login', 'nombreRol', 'email', 'fechaModificacion', 'nombre', 'estado', 'editar'];

  datosP=[];
  roles = [];
  estadoUsuarios= [ {nombre: 'Activo'}, {nombre: 'Inactivo'}]
  headerModal: string;
  nombreRolSelected: any;
  login: any;
  email: any;
  nombreUsuario: any;
  selectedEstado: string;
  id;
  matcher;

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private alertService: AlertService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//
    this.dataSource = new ListausuariosDataSource();
    this.recobrosService.findGestorMRoles().subscribe(data => {      
      for(var _i=0 ; _i<data.length; _i++){
        this.roles= [ ...this.roles, { id: (data[_i])["0"], nombreRol: (data[_i])["1"], 
                      descripcion: (data[_i])["2"]}  
        ];
      }
    });  
    this.recobrosService.findAdministracionUsuario().subscribe(data => {
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { id: (data[_i])["codigoUsuario"], login: (data[_i])["login"], nombreRol: (data[_i])["nombreRol"], 
                      email: (data[_i])["email"], fechaModificacion: (data[_i])["fecha"], nombre: (data[_i])["nombre"], 
                      estado: (data[_i])["estado"]}  
        ];
      }
      this.dataSource.data=  this.datosP;
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de los usuarios: "+error);
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
    this.dataSource = new ListausuariosDataSource();
    this.recobrosService.findAdministracionUsuario().subscribe(data => {
         
      this.datosP=[];
      this.dataSource.data = this.datosP;
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { id: (data[_i])["codigoUsuario"], login: (data[_i])["login"], nombreRol: (data[_i])["nombreRol"], 
                      email: (data[_i])["email"], fechaModificacion: (data[_i])["fecha"], nombre: (data[_i])["nombre"], 
                      estado: (data[_i])["estado"]}  
        ];
      }
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.dataSource.data.push(...this.datosP);
      this.spinner.hide();
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de los usuarios: "+error);
      this.dataSource.data= [];
    });
  }

  agregarRegistro(){  
    this.loginControl = new FormControl('', [Validators.required,]);
    this.nombreRolControl.setErrors({'required': false});
    this.emailUsuarioControl = new FormControl('', [Validators.required, Validators.email]); 
    this.nombreUsuarioControl = new FormControl('', [Validators.required,]); 
    this.estadoUsuarioControl.setErrors({'required': false});
        
    this.headerModal="Agregar usuario";
    this.login= null;
    this.nombreRolSelected=null;
    this.email= null;
    this.nombreUsuario= null;
    this.selectedEstado= 'Activo';
    /*(<HTMLInputElement>document.getElementById("numDocumento")).value=null;
    (<HTMLInputElement>document.getElementById("detalleClienteI")).value=null;*/
  }

  editarRegistro(row){
    //this.loginControlEditar.setErrors({'required': false});
    //this.nombreRolControlEditar.setErrors({'required': false});
    this.emailUsuarioControlEditar = new FormControl(row.email, [Validators.required, Validators.email]); 
    //this.nombreUsuarioControlEditar.setErrors({'required': false});
    //this.estadoUsuarioControlEditar.setErrors({'required': false});

    this.headerModal="Editar usuario";
    this.id= row.id;    
    this.login= row.login;
    this.nombreRolSelected=row.nombreRol;
    this.email= row.email;
    this.nombreUsuario= row.nombre;
    this.selectedEstado= row.estado;

    this.loginControlEditar = new FormControl(this.login, [Validators.required,]);
    this.nombreRolControlEditar = new FormControl(this.nombreRolSelected, [Validators.required,]);
    this.nombreUsuarioControlEditar = new FormControl(this.nombreUsuario, [Validators.required,]);
    this.estadoUsuarioControlEditar = new FormControl(this.selectedEstado, [Validators.required,]);
  }

  operacionRegistro(opcion: number, loginA, emailA, nombreUsuarioA){
    if(opcion==1){ //Editar
     this.recobrosService.EditAdmUsuario(this.id, loginA,this.nombreRolSelected, emailA, nombreUsuarioA, this.selectedEstado).subscribe(data => {
       if(data==null){
         this.alertService.danger("Falló la conexión con el origen de datos.");
       }else{
         if(data["exitoso"]!==undefined){
           this.alertService.success(data["exitoso"]);
         }else{
           this.alertService.danger(data["error"]);
         }
       }
       this.filtrarTabla();
       this.recobrosService.saveLog('Administración -> Usuarios', this.global.detalles_parametros_usuario[1] +this.login, this.global.login, 'Editar').subscribe(data => {});  
     }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo editar el usuario: "+error);
    });
    
    }else if(opcion==3){ //Guardar
     this.recobrosService.SaveAdmUsuario(loginA,this.nombreRolSelected, emailA, nombreUsuarioA, this.selectedEstado).subscribe(data => {    
       if(data==null){
         this.alertService.danger("Falló la conexión con el origen de datos.");
       }else{
         if(data["exitoso"]!==undefined){
           this.alertService.success(data["exitoso"]);
         }else{
           this.alertService.danger(data["error"]);
         }
       } 
       this.filtrarTabla();
       this.recobrosService.saveLog('Administración -> Usuarios', this.global.detalles_parametros_usuario[0] +loginA, this.global.login, 'Crear').subscribe(data => {});       
     }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo guardar el usuario: "+error);
    });
    }   
  }  
}
