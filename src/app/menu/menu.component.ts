import { Component, QueryList, ContentChildren, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { recobrosServices } from '../service/recobro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MessageServiceComponent } from '../message-service/message-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { Global } from '../global';
import { AuthService } from '../auth.service';
import {formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR'; 

registerLocaleData(localeEsAr, 'es-Ar'); 


interface FoodNode {
  name: string;
  nameIcono: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  /*{
    name: 'Gestor de menus',
    nameIcono: 'apps'
  },*/
  {
    name: 'Configuración',
    nameIcono: 'settings',
    children: [
      {name: 'Excepciones', nameIcono: 'contacts'},
      {name: 'Parametros App', nameIcono: 'settings_applications'},
      //{name: 'Clientes especiales', nameIcono: 'person'},
    ]
  }, {
    name: 'Herramientas',
    nameIcono: 'build',
    children: [
      {name: 'Arqueo', nameIcono: 'monetization_on'},
    ]
  },
  , {
    name: 'Administración',
    nameIcono: 'business_center',
    children: [
      //{name: 'Notificaciones', nameIcono: 'error'},
      {name: 'Logs', nameIcono: 'receipt'},
      //{name: 'Usuarios', nameIcono: 'group'},
    ]
  },
  {
    name: 'Informes',
    nameIcono: 'table_chart',
    children: [
      {name: 'Informe general', nameIcono: 'pie_chart'},
      {name: 'Informe mes', nameIcono: 'pie_chart'},
      {name: 'D. excepcionadas', nameIcono: 'person_add_disabled'}, 
      {name: 'D. incobrables', nameIcono: 'not_interested'},
      {name: 'Cargados TX', nameIcono: 'assignment'},
      {name: 'CargadosVSDeudas', nameIcono: 'assignment'},
      {name: 'DeudasVSCobros', nameIcono: 'assignment'},
      {name: 'RechazosVSFcargue', nameIcono: 'assignment'},
      {name: 'RechazosVSCobros', nameIcono: 'assignment'},
      {name: 'Irrecudiario', nameIcono: 'cloud_download'},
      {name: 'Deudas', nameIcono: 'cloud_download'},
      {name: 'I. Pendientes', nameIcono: 'cloud_download'},
      {name: 'Cobros', nameIcono: 'cloud_download'},
      {name: 'I. Incobrables', nameIcono: 'cloud_download'},
      {name: 'I. Excepcionados', nameIcono: 'cloud_download'},
    ]
  },
  {
    name: 'Consultas',
    nameIcono: 'insert_chart',
    children: [
      //{name: 'General', nameIcono: 'pie_chart'},
      {name: 'Exitosos', nameIcono: 'done_all'},
      {name: 'Pendientes', nameIcono: 'warning'},      
      {name: 'Incobrables', nameIcono: 'not_interested'},
      {name: 'Excepcionados', nameIcono: 'person_add_disabled'},
      {name: 'Transacciones', nameIcono: 'autorenew'}
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  nameIcono:string;
  level: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  private statusChangesSubscription: Subscription;
  show=true;
  datosP=[];
  datosSub=[];
  usLogin: string;
  id: string;
  contrasena: string;
  fechaActual;
  today= new Date();  

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      nameIcono: node.nameIcono,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  constructor(public authService: AuthService, private global: Global, private spinner: NgxSpinnerService, private alertService: AlertService, private rutaActiva: ActivatedRoute, private messageService: MessageServiceComponent ,private router: Router, private breakpointObserver: BreakpointObserver, private recobrosService: recobrosServices) {
   // this.dataSource.data = TREE_DATA;//
  }


  ngOnInit() {
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//

    this.fechaActual= formatDate(this.today, 'MMMM d, y', 'es-Ar', '-0500');
    this.id = localStorage.getItem('token');
    this.global.contrasena= localStorage.getItem('pass');
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.usLogin = this.id;
    if(this.usLogin=="recobro" || this.usLogin=="RECOBRO"){
        this.datosP = TREE_DATA;     
        this.global.login= this.usLogin;   
        this.recobrosService.saveLog('Login', this.global.detalles_login[0] ,this.global.login, 'login').subscribe(data => {});  
        this.global.menu= this.datosP;
        this.dataSource.data= this.global.menu;
        this.spinner.hide();
        this.alertService.info({html: '<b>Bienvenido (a) al módulo <br> de recobros&nbsp;</b>'+'<b>'+ this.usLogin + '</b>'});// Cambio 
    }else{
      this.recobrosService.findMenuLogin(this.usLogin, this.global.contrasena).subscribe(data => {
        if(this.usLogin=="recobro" || this.usLogin=="RECOBRO"){
          this.datosP = TREE_DATA;
        }else{
          if(data.length==1){           
          }
          for(var _i=1 ; _i<data.length; _i++){
            this.datosSub=[];
            for(var _j=0 ; _j<data[_i].submenu.length; _j++){
              this.datosSub= [ ...this.datosSub,
                {name: data[_i].submenu[_j].nombre, nameIcono:  data[_i].submenu[_j].icono}
              ];
            }
            this.datosP= [ ...this.datosP,
              { name: data[_i].nombre,
                nameIcono: data[_i].icono,
                children: this.datosSub
              }  
            ];
          }
        }   
        this.global.login= this.usLogin;   
        this.recobrosService.saveLog('Login', this.global.detalles_login[0] ,this.global.login, 'login').subscribe(data => {}); 
  
        this.global.menu= this.datosP;
        this.dataSource.data= this.global.menu;
        this.spinner.hide();
        this.alertService.info({html: '<b>Bienvenido (a) al módulo <br> de recobros&nbsp;</b>'+'<b>'+ this.usLogin + '</b>'});// Cambio
      }, error => { 
        this.spinner.hide(); 
        this.alertService.warning("No se pudo cargar el menú del usuario: "+error);
      });
    }    
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
