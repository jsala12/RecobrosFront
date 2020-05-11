import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class recobrosServices{
  context= "/WebServiceRecobros-RESTServices-context-root/service/recobros";
  //-----------------------------------LOGIN-------------------------------------------------------------------------------//
  private BASE_URL_LOGIN_MENU: string = this.context+ "/Login";
  
  //-----------------------------------GESTOR DE MENÚ----------------------------------------------------------------------//
  private BASE_URL_GESTORM_MENUS: string = this.context+ "/Menu";
  private BASE_URL_GESTORM_ROLES: string = this.context+ "/Roles";
  private BASE_URL_CONF_LISTA_EDITAR_MENU: string = this.context+ "/EditarMenu";
  private BASE_URL_CONF_LISTA_AGREGAR_MENU: string = this.context+ "/GuardarMenu";
  private BASE_URL_CONF_LISTA_ELIMINAR_MENU: string = this.context+ "/EliminarMenu";
  private BASE_URL_CONF_LISTA_EDITAR_ROL: string = this.context+ "/EditarRol";
  private BASE_URL_CONF_LISTA_AGREGAR_ROL: string = this.context+ "/GuardarRol";
  private BASE_URL_CONF_LISTA_ELIMINAR_ROL: string = this.context+ "/EliminarRol";
  private BASE_URL_CONF_LISTA_ROLMENUS: string = this.context+ "/RolMenus";

  //-----------------------------------CONFIGURACIÓN----------------------------------------------------------------------// 
    //-----------------------------------EXCEPCIONES----------------------------------------------------------//
      //-------------------Clientes------------------------------//
  private BASE_URL_CONF_EXCEPCIONADO_CLIENTE: string = this.context+ "/ExcepcionadoC";
  private BASE_URL_CONF_EXCEPCIONADO_TIPOD_CLIENTE: string = this.context+ "/ExcepcionadoCC";
  private BASE_URL_SAVE_EXCEPCIONADO_CLIENTE: string = this.context+ "/GuardarExc";
  private BASE_URL_DELETE_EXCEPCIONADO_CLIENTE: string = this.context+ "/EliminarExc"; 
  private BASE_URL_EDIT_EXCEPCIONADO_CLIENTE: string = this.context+ "/EditarExc"; 
      //-------------------Cuentas-------------------------------//
  private BASE_URL_CONF_EXCEPCIONADO_CUENTA: string = this.context+ "/ExcepcionadoCU";
  private BASE_URL_CONF_EXCEPCIONADO_TIPO_PRODUCTO: string = this.context+ "/ExcepcionadoCPC";
  private BASE_URL_SAVE_EXCEPCIONADO_CUENTA: string = this.context+ "/GuardarExcCU";
  private BASE_URL_DELETE_EXCEPCIONADO_CUENTA: string = this.context+ "/EliminarExcCU"; 
  private BASE_URL_EDIT_EXCEPCIONADO_CUENTA: string = this.context+ "/EditarExcCU"; 
      //-------------------Tipo productos------------------------//
  private BASE_URL_CONF_EXCEPCIONADO_TIPOP: string = this.context+ "/ExcepcionadoP";
  private BASE_URL_SAVE_EXCEPCIONADO_TIPOP: string = this.context+ "/GuardarExcP";
  private BASE_URL_DELETE_EXCEPCIONADO_TIPOP: string = this.context+ "/EliminarExcP"; 
  private BASE_URL_EDIT_EXCEPCIONADO_TIPOP: string = this.context+ "/EditarExcP"; 
      //-------------------Transacciones-------------------------//
  private BASE_URL_LISTA_TRANSACCIONES: string = this.context+ "/ListaTransacciones";
  private BASE_URL_CONF_EXCEPCIONADO_TRANSACCION: string = this.context+ "/ExcepcionadoT"; 
  private BASE_URL_SAVE_TRANSACCION: string = this.context+ "/GuardarExcT";
  private BASE_URL_DELETE_TRANSACCION: string = this.context+ "/EliminarExcT"; 
  private BASE_URL_EDIT_TRANSACCION: string = this.context+ "/EditarExcT"; 
    //-----------------------------------PARAMETROS APP--------------------------------------------------------//
  private BASE_URL_CONF_PARAMETROSAPP: string = this.context+ "/ExcepcionadoPN";
  private BASE_URL_SAVE_PARAMETROSAPP: string = this.context+ "/GuardarParam";
  private BASE_URL_DELETE_PARAMETROSAPP: string = this.context+ "/EliminarParam"; 
  private BASE_URL_EDIT_PARAMETROSAPP: string = this.context+ "/EditarParam";
  //-----------------------------------HERRAMIENTAS------------------------------------------------------------------------//
  private BASE_URL_HERRAMIENTAS_ARQUEO: string = this.context+ "/Arqueo";
  
  //-----------------------------------ADMINISTRACIÓN----------------------------------------------------------------------//
  private BASE_URL_ADMINISTRACION_NOTIFICACION: string = this.context+ "/AdministracionN";
  private BASE_URL_ADMINISTRACION_LOG: string = this.context+ "/AdministracionL";
  private BASE_URL_SAVE_LOG: string= this.context+ "/GuardarLog";
  private BASE_URL_ADMINISTRACION_USUARIO: string = this.context+ "/AdministracionU";
  private BASE_URL_SAVE_USUARIO: string= this.context+ "/GuardarUsuario";
  private BASE_URL_EDIT_USUARIO: string= this.context+ "/EditarUsuario";
  //-----------------------------------CONFIGURACIÓN DE REPORTES-----------------------------------------------------------//
  private BASE_URL_REPORTE_GENERAL: string = this.context+ "/reporteG";
  private BASE_URL_REPORTE_PENDIENTES: string = this.context+ "/reporteP";
  private BASE_URL_REPORTE_EXITOSOS: string = this.context+ "/reporteE";
  private BASE_URL_REPORTE_NOCOBRABLES: string = this.context+ "/reporteI"; //Incobrables
  private BASE_URL_REPORTE_CLIENTES_EXCEPCIONADOS: string = this.context+ "/reporteCE";
  private BASE_URL_REPORTE_CUENTAS_EXCEPCIONADAS: string = this.context+ "/reporteCUE";
  private BASE_URL_REPORTE_EXCEPCIONADOS: string = this.context+ "/reportePE"; //Productos Excepcionados
  private BASE_URL_REPORTE_TRANSACCIONES_EXCEPCIONADAS: string = this.context+ "/reporteTE";
  private BASE_URL_REPORTE_TRANSACCIONES: string = this.context+ "/reporteT";
  
 constructor(private http: Http, private loc: Location){
 }

//----------------------------------- SERVICIO DE MENU LOGIN -----------------------------------------------------------------------//
 findMenuLogin(login: string, loginDN: string, pass:string, host: string, port:string, ldacase: string): any{
  return this.http.get(this.BASE_URL_LOGIN_MENU + '?login='+login +'&loginDN='+loginDN+'&pass='+pass+'&host='+host+'&port='+port+'&ldacase='+ldacase)
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
}

//----------------------------------- SERVICIO DE GESTOR MENÚ ----------------------------------------------------------------------//
findGestorMMenus(): any{
  return this.http.get(this.BASE_URL_GESTORM_MENUS)
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
}
putMenu(id: string, nombre: string, icono: string, menuPadre: string, descripcion: string): any{
  return this.http.put(this.BASE_URL_CONF_LISTA_EDITAR_MENU + '?id='+id +'&nombre='+nombre +'&icono='+icono + '&menuPadre='+menuPadre + '&descripcion=' + descripcion,{})
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
}
saveMenu(nombre: string, icono: string, menuPadre: string, descripcion: string): any{
  return this.http.post(this.BASE_URL_CONF_LISTA_AGREGAR_MENU + '?nombre='+nombre +'&icono='+icono + '&menuPadre='+menuPadre + '&descripcion=' + descripcion, {})
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
}
deleteMenu(id: string): any{
  return this.http.delete(this.BASE_URL_CONF_LISTA_ELIMINAR_MENU + '?id='+id)
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
}
findGestorMRoles(): any{
  return this.http.get(this.BASE_URL_GESTORM_ROLES)
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
}
putRol(id: string, nombre: string, descripcion: string, permisos: string): any{
  return this.http.put(this.BASE_URL_CONF_LISTA_EDITAR_ROL + '?id='+id +'&nombre='+nombre + '&descripcion=' + descripcion + '&permisos='+permisos,{})
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
}
saveRol(nombre: string, descripcion: string): any{
  return this.http.post(this.BASE_URL_CONF_LISTA_AGREGAR_ROL + '?nombre='+nombre + '&descripcion=' + descripcion, {})
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
}
deleteRol(id: string): any{
  return this.http.delete(this.BASE_URL_CONF_LISTA_ELIMINAR_ROL + '?id='+id)
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
}
findRolMenus(id: string){
  return this.http.get(this.BASE_URL_CONF_LISTA_ROLMENUS + '?id='+id)
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
}

//-----------------------------------SERVICIOS DE CONFIGURACION---------------------------------------------------------------------//
  //-----------------------------------SERVICIOS DE EXCEPCIONES------------------------------------------------//
    //------Clientes------------------//
  findConfExcepcionadoCliente(tipoD: number): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_CLIENTE + '?tipoD='+tipoD)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  } 
  findConfExcepcionadoTipoDCliente(): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_TIPOD_CLIENTE)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  } 
  SaveClienteExcepcionado(numD: string, tipoD: string, detalle: string, estado: string): any{
    return this.http.post(this.BASE_URL_SAVE_EXCEPCIONADO_CLIENTE + '?numeroDocumento='+numD+'&tipoDocumento='+ tipoD + '&detalle='+detalle+'&estado='+estado,{})
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  } 
  EditClienteExcepcionado(numD: string, tipoD: string, detalle: string, estado: string): any{
  return this.http.put(this.BASE_URL_EDIT_EXCEPCIONADO_CLIENTE + '?numeroDocumento='+numD+'&tipoDocumento='+ tipoD + '&detalle='+detalle+'&estado='+estado,{})
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }   
  DeleteClienteExcepcionado(numD: string): any{
    return this.http.delete(this.BASE_URL_DELETE_EXCEPCIONADO_CLIENTE + '?numeroDocumento='+numD,{})
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }   
    //------Cuentas-----------------//
  findConfExcepcionadoCuenta(): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_CUENTA)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }
  findConfExcepcionadoListaTipoProducto(): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_TIPO_PRODUCTO)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }
  SaveCuentaExcepcionada(numCuenta: string, codProducto:string, estado: string, detalle: string): any{
    return this.http.post(this.BASE_URL_SAVE_EXCEPCIONADO_CUENTA + '?numCuenta='+numCuenta+'&codProducto='+codProducto+'&estado='+estado+'&detalle='+detalle,{})
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  } 
  EditCuentaExcepcionada(id: string, numCuenta: string, codProducto:string, detalle: string, estado: string): any{
    return this.http.put(this.BASE_URL_EDIT_EXCEPCIONADO_CUENTA + '?id='+id+'&numCuenta='+numCuenta+'&codProducto='+codProducto+'&estado='+estado+'&detalle='+detalle,{})
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }   
  DeleteCuentaExcepcionada(codigoCuenta: string): any{
    return this.http.delete(this.BASE_URL_DELETE_EXCEPCIONADO_CUENTA + '?codigoCuenta='+codigoCuenta,{})
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }   
    //------Tipo Producto-----------------//  
  findConfExcepcionadoTipoProducto(tipoD: string): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_TIPOP + '?tipoD='+tipoD)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }
  SaveTipoProductoExcepcionado(codProducto: string, estado:string, detalle: string): any{
    return this.http.post(this.BASE_URL_SAVE_EXCEPCIONADO_TIPOP + '?codProducto='+codProducto+'&estado='+estado+'&detalle='+detalle,{})
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  } 
  EditTipoProductoExcepcionado(id: string, codProducto:string, estado: string, detalle: string): any{
    return this.http.put(this.BASE_URL_EDIT_EXCEPCIONADO_TIPOP + '?id='+id+'&codProducto='+codProducto+'&estado='+estado+'&detalle='+detalle,{})
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }   
  DeleteTipoProductoExcepcionado(codigoProducto: string): any{
    return this.http.delete(this.BASE_URL_DELETE_EXCEPCIONADO_TIPOP + '?codigoProducto='+codigoProducto,{})
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  } 
    //------Transacciones-----------------//  
    findListaTransacciones(): any{
      return this.http.get(this.BASE_URL_LISTA_TRANSACCIONES)
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    findConfExcepcionadoTransaccion(): any{
      return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_TRANSACCION)
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    SaveTransaccion(codTransaccion: string, estado:string, detalle: string): any{
      return this.http.post(this.BASE_URL_SAVE_TRANSACCION + '?codigoTransaccion='+codTransaccion+'&estado='+estado+'&detalle='+detalle,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    } 
    EditTransaccion(id: string, estado: string, detalle: string): any{
      return this.http.put(this.BASE_URL_EDIT_TRANSACCION + '?id='+id + '&estado='+estado+'&detalle='+detalle,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }  
    DeleteTransaccion(codTransaccion: string): any{
      return this.http.delete(this.BASE_URL_DELETE_TRANSACCION + '?codigoTransaccion='+codTransaccion,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }  
  //-----------------------------------SERVICIOS DE PARAMETROS APP----------------------------------------------//
  findConfParametroApp(): any{
    return this.http.get(this.BASE_URL_CONF_PARAMETROSAPP)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  } 
  SaveConfParametro(descripcion: string, valorCampo:string, nombre: string): any{
    return this.http.post(this.BASE_URL_SAVE_PARAMETROSAPP +'?descripcion='+descripcion+'&valorCampo='+valorCampo+'&nombre='+nombre,{})
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  } 
  EditConfParametro(id: string, descripcion: string, valorCampo:string, nombre: string): any{
    return this.http.put(this.BASE_URL_EDIT_PARAMETROSAPP + '?id='+id+'&descripcion='+descripcion+'&valorCampo='+valorCampo+'&nombre='+nombre,{}).pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }   
  DeleteConfParametro(codigoParametro: string): any{
    return this.http.delete(this.BASE_URL_DELETE_PARAMETROSAPP + '?codigoParametro='+codigoParametro,{})
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }  

//---------------------------------SERVICIOS DE HERRAMIENTAS------------------------------------------------------------//
findHerramientasArqueo(fechaI: string, fechaF: string, codigoO: string): any{
  return this.http.get(this.BASE_URL_HERRAMIENTAS_ARQUEO + '?fechaI='+fechaI+'&fechaF='+fechaF+'&codigoO='+codigoO)
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
} 

//---------------------------------SERVICIOS DE ADMINISTRACIÓN-----------------------------------------------------------//
findAdministracionNotificacion(): any{
  return this.http.get(this.BASE_URL_ADMINISTRACION_NOTIFICACION)
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
} 
findAdministracionLog(fechaI: string, fechaF: string): any{
  return this.http.get(this.BASE_URL_ADMINISTRACION_LOG+ '?fechaI='+fechaI+'&fechaF='+fechaF)
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
} 
saveLog(menuP: string, descripcion: string, login: string, accion: string){
  return this.http.post(this.BASE_URL_SAVE_LOG + '?nombreMenu='+ menuP+ '&descripcion='+descripcion+'&login='+login+'&accion='+accion, {})
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  } 
  //----------------Usuarios-------------------//
findAdministracionUsuario(): any{
  return this.http.get(this.BASE_URL_ADMINISTRACION_USUARIO)
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
} 
SaveAdmUsuario(login: string, nombreRol:string, email: string, nombre: string, estado: string): any{
  return this.http.post(this.BASE_URL_SAVE_USUARIO +'?login='+login+'&nombreRol='+nombreRol+'&email='+email+'&nombre='+nombre+'&estado='+estado,{})
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
} 
EditAdmUsuario(id: string, login: string, nombreRol:string, email: string, nombre: string, estado: string): any{
  return this.http.put(this.BASE_URL_EDIT_USUARIO +'?id='+id+'&login='+login+'&nombreRol='+nombreRol+'&email='+email+'&nombre='+nombre+'&estado='+estado,{})
  .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
}   

//---------------------------------SERVICIOS DE REPORTES-----------------------------------------------------------------//
  findByName(fechaI: string, fechaF: string): any{
    const angularRoute = this.loc.path();
    const url = window.location.href;
    const domainAndApp = url.replace(angularRoute, '');
    return this.http.get(this.BASE_URL_REPORTE_GENERAL + '?fechaI='+fechaI +'&fechaF='+fechaF)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }
  findPendientes(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_PENDIENTES + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findExitosos(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string, fechaCI: string, fechaCF: string): any{
    return this.http.get(this.BASE_URL_REPORTE_EXITOSOS + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT+'&fechaCI='+fechaCI+'&fechaCF='+fechaCF)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));  
  }
  findNoCobrables(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_NOCOBRABLES + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }
  findClientesExcepcionados(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_CLIENTES_EXCEPCIONADOS + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }
  findCuentasExcepcionadas(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_CUENTAS_EXCEPCIONADAS + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }
  findExcepcionados(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_EXCEPCIONADOS + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }
  findTransaccionesExcepcionadas(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_TRANSACCIONES_EXCEPCIONADAS + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }
  findTransacciones(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_TRANSACCIONES + '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }
  findUrlWebservice(): string{
    return environment.urlWebService;
  }
}