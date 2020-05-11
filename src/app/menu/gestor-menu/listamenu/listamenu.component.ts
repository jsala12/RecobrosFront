import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListamenuDataSource, ListamenuItem } from './listamenu-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import { AlertService } from 'ngx-alerts';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { map } from 'rxjs/operators'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from 'src/app/global';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-listamenu',
  templateUrl: './listamenu.component.html',
  styleUrls: ['./listamenu.component.css']
})
export class ListamenuComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListamenuItem>;
  dataSource: ListamenuDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'nombreIcono', 'menuPadre', 'descripcion', 'editar', 'eliminar'];

  datosP=[];
  menusP=[];
  headerModal;
  codigoMenu;
  nombre;
  icono;
  selectedMenuP;
  descripcion;
  matcher;

  nombreControl = new FormControl('', [Validators.required,]);
  iconoControl = new FormControl('', [Validators.required,]); 
  descripcionControl = new FormControl('', [Validators.required,]); 
  nombreControlE = new FormControl('', [Validators.required,]); 
  iconoControlE = new FormControl('', [Validators.required,]);
  descripcionControlE = new FormControl('', [Validators.required,]); 
  usLogin: string;

  constructor(public authService: AuthService, private global: Global, private router : Router, private recobrosService: recobrosServices, private changeDetectorRefs: ChangeDetectorRef, private alertService: AlertService, private spinner: NgxSpinnerService){
  }

  ngOnInit() {   
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------// 
    this.dataSource = new ListamenuDataSource();
    this.recobrosService.findGestorMMenus().subscribe(data => {
      
    this.menusP=[ { nombre: null } ];
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { id: (data[_i])["id"], nombre: (data[_i])["nombre"], nombreIcono: (data[_i])["nombre_icono"],
         menuPadre: (data[_i])["menu_padre"], descripcion: (data[_i])["descripcion"]}  
      ];
      if((data[_i])["menu_padre"]==null){
      this.menusP=[ ...this.menusP, { nombre:(data[_i])["nombre"] } ];
      }
      }
      this.dataSource.data=  this.datosP;
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de los menús: "+error);
      this.dataSource.data= [];
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.spinner.hide();
  }

  editarRegistro(row){    
    //this.nombreControlE.setErrors({'required': false});
    //this.iconoControlE.setErrors({'required': false});
    //this.descripcionControlE.setErrors({'required': false});
    this.headerModal="Editar menú";
    this.nombre=row.nombre;
    this.icono=row.nombreIcono;
    this.selectedMenuP=row.menuPadre;
    this.descripcion=row.descripcion;
    this.codigoMenu= row.id;
    
    this.nombreControlE = new FormControl(this.nombre, [Validators.required,]);
    this.iconoControlE = new FormControl(this.icono, [Validators.required,]);
    this.descripcionControlE = new FormControl(this.descripcion, [Validators.required,]);
 }

 eliminarRegistro(row){
   this.headerModal="Eliminar menú";
   this.nombre=row.nombre;
   this.codigoMenu= row.id;
}

agregarRegistro(){
  this.nombreControl = new FormControl('', [Validators.required,]);
  this.iconoControl = new FormControl('', [Validators.required,]); 
  this.descripcionControl = new FormControl('', [Validators.required,]); 
  this.headerModal="Agregar menú";
  this.selectedMenuP= null;
  this.nombre=null;
  this.icono= null;
  this.descripcion= null;
 }

operacionRegistro(opcion: number, nombre, icono, descripcion){
  if(opcion==1){ //Editar
   this.recobrosService.putMenu(this.codigoMenu, nombre, icono, this.selectedMenuP, descripcion).subscribe(data => {    
    this.filtrarTabla();
    if(data==null){
      this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
        if(data["exitoso"]!==undefined){
          this.alertService.success(data["exitoso"]);
        }else{
          this.alertService.danger(data["error"]);
        }
      } 
     this.recobrosService.saveLog('Gestor menús -> Configuración menus', this.global.detalles_menu[1] + this.nombre,this.global.login, 'Editar').subscribe(data => {});
   }, error => { 
    this.spinner.hide(); 
    this.alertService.warning("No se pudo editar el menú: "+error);
  });
  
  }else if(opcion==2){ //Eliminar
   this.recobrosService.deleteMenu(this.codigoMenu).subscribe(data => {
    this.filtrarTabla();
     if(data==null){
      this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
      if(data["exitoso"]!==undefined){
      this.alertService.success(data["exitoso"]);
      }else{
      this.alertService.danger(data["error"]);
      }
      } 
     this.recobrosService.saveLog('Gestor menús -> Configuración menús', this.global.detalles_menu[2] + this.nombre,this.global.login, 'Eliminar').subscribe(data => {}); 
   }, error => { 
    this.spinner.hide(); 
    this.alertService.warning("No se pudo eliminar el menú: "+error);
  });
  }else if(opcion==3){ //Guardar
   this.recobrosService.saveMenu(nombre, icono, this.selectedMenuP, descripcion).subscribe(data => {
    this.filtrarTabla();
     if(data==null){
      this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
      if(data["exitoso"]!==undefined){
      this.alertService.success(data["exitoso"]);
      }else{
      this.alertService.danger(data["error"]);
      }
      } 
     this.recobrosService.saveLog('Gestor menús -> Configuración menus', this.global.detalles_menu[0] + nombre,this.global.login, 'Crear').subscribe(data => {}); 
     
   }, error => { 
    this.spinner.hide(); 
    this.alertService.warning("No se pudo guardar el menú: "+error);
  });
  }  
}

filtrarTabla(){
  //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
  this.authService.actualizarSesion(this.global.timeOut);
  //-------------------------------------------------------------------------------------------//
  this.spinner.show();
  this.dataSource = new ListamenuDataSource();
  this.recobrosService.findGestorMMenus().subscribe(data => {
    
    this.menusP=[ { nombre: null } ];    
    this.datosP=[];
    this.dataSource.data=this.datosP;     
    for(var _i=0 ; _i<data.length; _i++){
      this.datosP= [ ...this.datosP, { id: (data[_i])["id"], nombre: (data[_i])["nombre"], 
                        nombreIcono: ((data[_i])["nombre_icono"]) , menuPadre:  ((data[_i])["menu_padre"]), 
                        descripcion: ((data[_i])["descripcion"])}  
      ];
      if((data[_i])["menu_padre"]==null){
      this.menusP=[ ...this.menusP, { nombre:(data[_i])["nombre"] } ];
      }
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.data.push(...this.datosP);
    this.spinner.hide();
  }, error => { 
    this.spinner.hide(); 
    this.alertService.warning("No se pudo cargar la información de los menús: "+error);
  });
}

}
