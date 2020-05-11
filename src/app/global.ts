import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { recobrosServices } from './service/recobro.service';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './auth.service';


@Injectable()
export class Global {
  timeOut: number= 1800000; //1000ms= 1s; por defecto 1800000 ms = 30 min
  login: string;
  contrasena:string;
  menu=[];
  detalles_login=['Ingresó al módulo'];
  //[crear, editar, eliminar]
  detalles_menu=['Se ha creado el menú ','Se ha editado el menú ','Se ha eliminado el menú '];
  detalles_rol=['Se ha creado el rol ','Se ha editado el rol ','Se ha eliminado el rol '];
  detalles_excepciones_cliente=['Se ha creado la excepción del cliente con identificación ','Se ha editado la excepción del cliente con identificación ','Se ha borrado la excepción del cliente con identificación '];
  detalles_excepciones_cuenta=['Se ha creado la excepción de la cuenta número ','Se ha editado la excepción de la cuenta número ','Se ha eliminado la excepción de la cuenta número '];
  detalles_excepciones_tipoP=['Se ha creado la excepción del tipo de producto ','Se ha editado la excepción del tipo de producto ','Se ha borrado la excepción del tipo de producto  '];
  detalles_excepciones_transaccion=['Se ha creado la excepción de la transacción ','Se ha editado la excepción de la transacción ','Se ha eliminado la excepción de la transacción ']; 
  detalles_clientes_especiales=['Se ha agregado el cliente especial ','Se ha editado el cliente especial ','Se ha eliminado el cliente especial ']; 
  detalles_parametros_app=['Se agregó el parámetro ','Se editó el parámetro ','Se eliminó el parámetro '];
  detalles_parametros_usuario=['Se ha creado el usuario ','Se ha editado el usuario '];
  
}