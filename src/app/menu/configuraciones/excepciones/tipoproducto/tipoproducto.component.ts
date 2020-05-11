import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { TipoproductoDataSource, TipoproductoItem } from './tipoproducto-datasource';
import { recobrosServices } from 'src/app/service/recobro.service';
import { AlertService } from 'ngx-alerts';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from 'src/app/global';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-tipoproducto',
  templateUrl: './tipoproducto.component.html',
  styleUrls: ['./tipoproducto.component.css']
})
export class TipoproductoComponent implements AfterViewInit, OnInit {
  detalleTipoProductoControl = new FormControl('', [Validators.required,]); 
  codigoTipoProductoControl = new FormControl('', [Validators.required,]);
  estadoTipoProductoControl = new FormControl('', [Validators.required,]);   
  detalleTipoProductoControlEditar = new FormControl('', [Validators.required,]); 
  codigoTipoProductoControlEditar = new FormControl('', [Validators.required,]);
  estadoTipoProductoControlEditar = new FormControl('', [Validators.required,]); 
  autorizaControl = new FormControl('', [Validators.required,]); 

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<TipoproductoItem>;
  dataSource: TipoproductoDataSource;

  selectedCatTipProducto='CC';
  datosP=[];
  length;
  seleccionadoTipoCuenta : string;
  tipoProductos=[];
  headerModal: string;
  estadoTipoProductoSelected;
  selectedTipoProducto;
  detalleTipoProducto;
  idTipoProducto: any;
  matcher;
  detalleTipoProductoD;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'detalle', 'tipoProducto', 'fechaCreacion', 'usrautoriza', 'estado', 'editar', 'eliminar'];
  categoriaProductos= ['CC', 'AH'];
  codigoSelectedTipoProducto: any;
  tipoProductosA=[];
  usrautoriza: any;

  constructor(public authService: AuthService, private global: Global, private recobrosService: recobrosServices, private alertService: AlertService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {    
    this.dataSource = new TipoproductoDataSource();
    this.selectedCatTipProducto= 'CC';
    this.recobrosService.findConfExcepcionadoListaTipoProducto().subscribe(data => {
      this.tipoProductos = data;    

      if(this.selectedCatTipProducto=='CC'){
        this.tipoProductosA=[];
        for (let tipoProducto of this.tipoProductos){
          if(tipoProducto.id.tipoProducto=== this.selectedCatTipProducto){
            this.tipoProductosA.push(tipoProducto);
          }
        }
      }else{
        this.tipoProductosA=[];
        for (let tipoProducto of this.tipoProductos){
          if(tipoProducto.id.tipoProducto=== this.selectedCatTipProducto){
            this.tipoProductosA.push(tipoProducto);
          }
        }
      }
    }, error => { 
      this.alertService.warning("No se pudo cargar los tipos de productos: "+error);
    });

    
    this.recobrosService.findConfExcepcionadoTipoProducto(this.selectedCatTipProducto).subscribe(data => {
      
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { id: (data[_i])["codigoExcepcion"], detalle: (data[_i])["detalle"], 
                          tipoProducto: (data[_i])["tipoProducto"], 
                          nombre: (data[_i])["codigoProducto"]["nombre"],  
                          estado:  ((data[_i])["codigoEstadoExcepcion"])["nombre"], 
                          fechaCreacion: (data[_i])["fechacreacion"], 
                          usrautoriza: (data[_i])["usrautoriza"]}  
        ];
      }
      this.dataSource.data=  this.datosP;
    }, error => { 
      this.spinner.hide(); 
      this.alertService.warning("No se pudo cargar la información de excepciones a tipos de productos: "+error);
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
    this.dataSource = new TipoproductoDataSource();
    this.recobrosService.findConfExcepcionadoTipoProducto(this.selectedCatTipProducto).subscribe(data => {
         
      this.datosP=[];
      this.dataSource.data = this.datosP;
      for(var _i=0 ; _i<data.length; _i++){
        this.datosP= [ ...this.datosP, { id: (data[_i])["codigoExcepcion"], detalle: (data[_i])["detalle"], 
                          tipoProducto: (data[_i])["tipoProducto"], 
                          nombre: (data[_i])["codigoProducto"]["nombre"],
                           estado:  ((data[_i])["codigoEstadoExcepcion"])["nombre"], 
                           fechaCreacion: (data[_i])["fechacreacion"], 
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
      this.alertService.warning("No se pudo cargar la información de excepciones a tipos de productos: "+error);
      this.dataSource.data= [];
    });

    if(this.selectedCatTipProducto=='CC'){
      this.tipoProductosA=[];
      for (let tipoProducto of this.tipoProductos){
        if(tipoProducto.id.tipoProducto=== this.selectedCatTipProducto){
          this.tipoProductosA.push(tipoProducto);
        }
      }
    }else{
      this.tipoProductosA=[];
      for (let tipoProducto of this.tipoProductos){
        if(tipoProducto.id.tipoProducto=== this.selectedCatTipProducto){
          this.tipoProductosA.push(tipoProducto);
        }
      }
    }
  }

  agregarRegistro(){  
    this.detalleTipoProductoControl = new FormControl('', [Validators.required,]); 
    this.codigoTipoProductoControl = new FormControl('', [Validators.required,]);
    this.estadoTipoProductoControl = new FormControl('', [Validators.required,]);     
    this.autorizaControl = new FormControl('', [Validators.required,]); 
    this.usrautoriza=null;   
    this.headerModal="Agregar excepción a tipo de producto";
    (<HTMLInputElement>document.getElementById("detalleTipoProductoI")).value=null;  
    (<HTMLInputElement>document.getElementById("usrautorizaI")).value=null; 

    this.selectedTipoProducto= null;
    this.estadoTipoProductoSelected=null;    
  }

  editarRegistro(row){
    this.headerModal="Editar excepción a tipo de producto";
    if(row.estado=="ACTIVO"){
      this.estadoTipoProductoSelected=1;
    }else{
      this.estadoTipoProductoSelected=2;
    }    
    this.idTipoProducto= row.id;
    this.selectedTipoProducto=row.nombre;
    this.detalleTipoProducto=row.detalle;
    this.usrautoriza= row.usrautoriza;

    this.detalleTipoProductoControlEditar = new FormControl(this.detalleTipoProducto, [Validators.required,]);
    this.codigoTipoProductoControlEditar = new FormControl(this.detalleTipoProducto, [Validators.required,]);
    this.estadoTipoProductoControlEditar = new FormControl(this.estadoTipoProductoSelected, [Validators.required,]);
  } 

  selected(event) {
    let target = event.source.selected._element.nativeElement;
    let selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
  }

  eliminarRegistro(row){
    this.headerModal="Eliminar excepción a tipo producto";
    this.selectedTipoProducto=row.nombre;
    this.idTipoProducto=row.id;
    this.usrautoriza=row.usrautoriza;
  }

  operacionRegistro(opcion: number, idTipoProductoA, detalleTipoProductoA, autoriza){
   if(opcion==1){ //Editar    
    this.recobrosService.EditTipoProductoExcepcionado(idTipoProductoA, this.selectedTipoProducto, this.estadoTipoProductoSelected, detalleTipoProductoA).subscribe(data => {    
      if(data==null){
        this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
        if(data["exitoso"]!==undefined){
          this.alertService.success(data["exitoso"]);
        }else{
          this.alertService.danger(data["error"]);
        }
      }
      this.recobrosService.saveLog('Configuración -> Excepciones -> Tipo producto', this.global.detalles_excepciones_tipoP[1] +this.selectedTipoProducto, this.global.login, 'Editar').subscribe(data => {});  
      this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Producto', this.global.detalles_excepciones_tipoP[1] +this.selectedTipoProducto, this.global.login, 'Editar', autoriza).subscribe(data => {
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
      this.alertService.warning("No se pudo editar la excepción a tipo de producto: "+error);
    });
   
   }else if(opcion==2){ //Eliminar
    this.recobrosService.DeleteTipoProductoExcepcionado(this.idTipoProducto).subscribe(data => {       
      if(data==null){
        this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
        if(data["exitoso"]!==undefined){
          this.alertService.success(data["exitoso"]);
        }else{
          this.alertService.danger(data["error"]);
        }
      }
      this.recobrosService.saveLog('Configuración -> Excepciones -> Tipo producto', this.global.detalles_excepciones_tipoP[2] +this.selectedTipoProducto, this.global.login, 'Eliminar').subscribe(data => {});
      this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Tipo producto', this.global.detalles_excepciones_tipoP[2] +this.selectedTipoProducto, this.global.login, 'Eliminar', this.usrautoriza).subscribe(data => {
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
      this.alertService.warning("No se pudo eliminar la excepción a tipo de producto: "+error);
    });
   }else if(opcion==3){ //Guardar
    this.recobrosService.SaveTipoProductoExcepcionado(this.selectedTipoProducto, this.estadoTipoProductoSelected, detalleTipoProductoA, autoriza).subscribe(data => {   
      if(data==null){
        this.alertService.danger("Falló la conexión con el origen de datos.");
      }else{
        if(data["exitoso"]!==undefined){
          this.alertService.success(data["exitoso"]);
        }else{
          this.alertService.danger(data["error"]);
        }
      }      
      this.recobrosService.saveLog('Configuración -> Excepciones -> Tipo producto', this.global.detalles_excepciones_tipoP[0] +this.selectedTipoProducto, this.global.login, 'Crear').subscribe(data => {});
      this.recobrosService.enviarNotificacion('Configuración -> Excepciones -> Tipo producto', this.global.detalles_excepciones_tipoP[0] +this.selectedTipoProducto, this.global.login, 'Crear', autoriza).subscribe(data => {
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
      this.alertService.warning("No se pudo guardar la excepción a tipo de producto: "+error);
    });
   }   
 }
}
