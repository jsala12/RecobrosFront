import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListarolDataSource, ListarolItem } from './listarol-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import { AlertService } from 'ngx-alerts';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from 'src/app/global';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-listarol',
  templateUrl: './listarol.component.html',
  styleUrls: ['./listarol.component.css']
})
export class ListarolComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListarolItem>;
  dataSource: ListarolDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'descripcion','editar','eliminar'];
  datosP=[];
  menusP=[];
  anotherList=[];
  headerModal;
  nombre;
  descripcion;
  selectedMenuP;
  codigoRol;
  permisos;
  matcher;
  toppings = new FormControl();

  nombreControl = new FormControl('', [Validators.required,]);
  descripcionControl = new FormControl('', [Validators.required,]); 
  nombreControlE = new FormControl('', [Validators.required,]); 
  descripcionControlE = new FormControl('', [Validators.required,]); 


  constructor(public authService: AuthService, private global: Global, private router : Router, private recobrosService: recobrosServices, private changeDetectorRefs: ChangeDetectorRef, private alertService: AlertService, private spinner: NgxSpinnerService){
  }

  ngOnInit() {    
    this.spinner.show();
    this.dataSource = new ListarolDataSource();    
    this.recobrosService.findGestorMRoles().subscribe(data => {
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { id: (data[_i])[0], nombre: (data[_i])[1], descripcion: (data[_i])[2]}  
      ];
      }
      this.dataSource.data=  this.datosP;
    });

    this.recobrosService.findGestorMMenus().subscribe(data => {      
      this.menusP=[ { nombre: null } ];
        for(var _i=0 ; _i<data.length; _i++){
          if(_i==0){
          this.menusP = [(data[_i])["nombre"]];
          }else{
          this.menusP = [ ...this.menusP, (data[_i])["nombre"]];
        }
      }
      }, error => { 
        this.spinner.hide(); 
        this.alertService.warning("No se pudo cargar la información de roles: "+error);
      });  
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  editarRegistro(row){
    this.recobrosService.findGestorMMenus().subscribe(data => {
      
    this.menusP=[ { nombre: null } ];
      for(var _i=0 ; _i<data.length; _i++){
        if(_i==0){
        this.menusP = [(data[_i])["nombre"]];
      }else{
      this.menusP = [ ...this.menusP, (data[_i])["nombre"]];
    }
    }
    });
    
    this.toppings = new FormControl();
    this.toppings.setValue([]);
    //this.nombreControlE.setErrors({'required': false});
    //this.descripcionControlE.setErrors({'required': false}); 
    this.codigoRol=row.id;
    this.recobrosService.findRolMenus(this.codigoRol).subscribe(data => {      
      this.toppings.setValue(data);
    });
    this.headerModal="Editar rol";
    this.nombre=row.nombre;
    this.descripcion=row.descripcion;
    
    this.nombreControlE = new FormControl(this.nombre, [Validators.required,]);
    this.descripcionControlE = new FormControl(this.descripcion, [Validators.required,]);
 }

 eliminarRegistro(row){
   this.headerModal="Eliminar rol";
   this.codigoRol=row.id;
   this.nombre= row.nombre;
}

agregarRegistro(){
  this.nombreControl = new FormControl('', [Validators.required,]);
  this.descripcionControl = new FormControl('', [Validators.required,]); 
  this.headerModal="Agregar rol";
  this.nombre=null;
  this.descripcion=null;
  this.codigoRol=null;
 }

 operacionRegistro(opcion: number, nombre, descripcion){
  if(opcion==1){ //Editar
    if(this.toppings.value.length==0){
      this.alertService.warning("No se asignaron menús al rol");
      this.recobrosService.putRol(this.codigoRol, nombre, descripcion, this.toppings.value+"").subscribe(data => {    
        if(data==null){
         this.alertService.danger("Falló la conexión con el origen de datos.");
         }else{
           if(data["exitoso"]!==undefined){
             this.alertService.success(data["exitoso"]);
           }
         } 
        this.filtrarTabla();
        this.recobrosService.saveLog('Gestor menús -> Configuración rol', this.global.detalles_menu[1] + this.nombre,this.global.login, 'Editar').subscribe(data => {});
      }, error => { 
       this.spinner.hide(); 
       this.alertService.warning("No se pudo editar el rol: "+error);
      });
    }else{
      this.recobrosService.putRol(this.codigoRol, nombre, descripcion, this.toppings.value+"").subscribe(data => { 
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
        this.recobrosService.saveLog('Gestor menús -> Configuración rol', this.global.detalles_menu[1] + this.nombre,this.global.login, 'Editar').subscribe(data => {});
      }, error => { 
       this.spinner.hide(); 
       this.alertService.warning("No se pudo editar el rol: "+error);
      });
    }  
  
  }else if(opcion==2){ //Eliminar
   this.recobrosService.deleteRol(this.codigoRol).subscribe(data => {
     
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
     this.recobrosService.saveLog('Gestor menús -> Configuración rol', this.global.detalles_menu[2] + this.nombre,this.global.login, 'Eliminar').subscribe(data => {});
   }, error => { 
    this.spinner.hide(); 
    this.alertService.warning("No se pudo eliminar el rol: "+error);
  });
  }else if(opcion==3){ //Guardar
   this.recobrosService.saveRol(nombre, descripcion).subscribe(data => {
     
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
     this.recobrosService.saveLog('Gestor menús -> Configuración rol', this.global.detalles_menu[0] +nombre,this.global.login, 'Guardar').subscribe(data => {});
   }, error => { 
    this.spinner.hide(); 
    this.alertService.warning("No se pudo guardar el rol: "+error);
  });
  }  
}

filtrarTabla(){
  //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
  this.authService.actualizarSesion(this.global.timeOut);
  //-------------------------------------------------------------------------------------------//
  this.spinner.show();
  this.dataSource = new ListarolDataSource();  
  this.recobrosService.findGestorMRoles().subscribe(data => {
    
    this.datosP=[];
    this.dataSource.data=this.datosP;     
    for(var _i=0 ; _i<data.length; _i++){
      this.datosP= [ ...this.datosP, { id: (data[_i])[0], nombre: (data[_i])[1], descripcion: (data[_i])[2]}  
    ];
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.data.push(...this.datosP);
    this.spinner.hide();
  }, error => { 
    this.spinner.hide(); 
    this.alertService.warning("No se pudo cargar la información: "+error);
  });
}

}
