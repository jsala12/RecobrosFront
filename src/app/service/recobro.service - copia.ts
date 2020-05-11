import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class recobrosServices{
  //-----------------------------------LOGIN-------------------------------------------------------------------------------//
  private BASE_URL_LOGIN_MENU: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/Login";
  
  //-----------------------------------GESTOR DE MENÚ----------------------------------------------------------------------//
  private BASE_URL_GESTORM_MENUS: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/Menu";
  private BASE_URL_GESTORM_ROLES: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/Roles";
  private BASE_URL_CONF_LISTA_EDITAR_MENU: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EditarMenu";
  private BASE_URL_CONF_LISTA_AGREGAR_MENU: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/GuardarMenu";
  private BASE_URL_CONF_LISTA_ELIMINAR_MENU: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EliminarMenu";
  private BASE_URL_CONF_LISTA_EDITAR_ROL: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EditarRol";
  private BASE_URL_CONF_LISTA_AGREGAR_ROL: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/GuardarRol";
  private BASE_URL_CONF_LISTA_ELIMINAR_ROL: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EliminarRol";
  private BASE_URL_CONF_LISTA_ROLMENUS: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/RolMenus";

  //-----------------------------------CONFIGURACIÓN----------------------------------------------------------------------// 
    //-----------------------------------EXCEPCIONES----------------------------------------------------------//
      //-------------------Clientes------------------------------//
  private BASE_URL_CONF_EXCEPCIONADO_CLIENTE: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/ExcepcionadoC";
  private BASE_URL_CONF_EXCEPCIONADO_TIPOD_CLIENTE: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/ExcepcionadoCC";
  private BASE_URL_SAVE_EXCEPCIONADO_CLIENTE: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/GuardarExc";
  private BASE_URL_DELETE_EXCEPCIONADO_CLIENTE: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EliminarExc"; 
  private BASE_URL_EDIT_EXCEPCIONADO_CLIENTE: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EditarExc"; 
      //-------------------Cuentas-------------------------------//
  private BASE_URL_CONF_EXCEPCIONADO_CUENTA: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/ExcepcionadoCU";
  private BASE_URL_CONF_EXCEPCIONADO_TIPO_PRODUCTO: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/ExcepcionadoCPC";
  private BASE_URL_SAVE_EXCEPCIONADO_CUENTA: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/GuardarExcCU";
  private BASE_URL_DELETE_EXCEPCIONADO_CUENTA: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EliminarExcCU"; 
  private BASE_URL_EDIT_EXCEPCIONADO_CUENTA: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EditarExcCU"; 
      //-------------------Tipo productos------------------------//
  private BASE_URL_CONF_EXCEPCIONADO_TIPOP: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/ExcepcionadoP";
  private BASE_URL_SAVE_EXCEPCIONADO_TIPOP: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/GuardarExcP";
  private BASE_URL_DELETE_EXCEPCIONADO_TIPOP: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EliminarExcP"; 
  private BASE_URL_EDIT_EXCEPCIONADO_TIPOP: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EditarExcP"; 
      //-------------------Transacciones-------------------------//
  private BASE_URL_CONF_EXCEPCIONADO_TRANSACCION: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/ExcepcionadoT";
    //-----------------------------------PARAMETROS APP--------------------------------------------------------//
  private BASE_URL_CONF_PARAMETROSAPP: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/ExcepcionadoPN";
  private BASE_URL_SAVE_PARAMETROSAPP: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/GuardarParam";
  private BASE_URL_DELETE_PARAMETROSAPP: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EliminarParam"; 
  private BASE_URL_EDIT_PARAMETROSAPP: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EditarParam";
  //-----------------------------------HERRAMIENTAS------------------------------------------------------------------------//
  private BASE_URL_HERRAMIENTAS_ARQUEO: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/Arqueo";
  
  //-----------------------------------ADMINISTRACIÓN----------------------------------------------------------------------//
  private BASE_URL_ADMINISTRACION_NOTIFICACION: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/AdministracionN";
  private BASE_URL_ADMINISTRACION_LOG: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/AdministracionL";
  private BASE_URL_ADMINISTRACION_USUARIO: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/AdministracionU";
  private BASE_URL_SAVE_USUARIO: string= environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/GuardarUsuario";
  private BASE_URL_EDIT_USUARIO: string= environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/EditarUsuario";
  //-----------------------------------CONFIGURACIÓN DE REPORTES-----------------------------------------------------------//
  private BASE_URL_REPORTE_GENERAL: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/reporteG";
  private BASE_URL_REPORTE_PENDIENTES: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/reporteP";
  private BASE_URL_REPORTE_EXITOSOS: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/reporteE";
  private BASE_URL_REPORTE_NOCOBRABLES: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/reporteI"; //Incobrables
  private BASE_URL_REPORTE_CLIENTES_EXCEPCIONADOS: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/reporteCE";
  private BASE_URL_REPORTE_CUENTAS_EXCEPCIONADAS: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/reporteCUE";
  private BASE_URL_REPORTE_EXCEPCIONADOS: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/reportePE"; //Productos Excepcionados
  private BASE_URL_REPORTE_TRANSACCIONES_EXCEPCIONADAS: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/reporteTE";
  private BASE_URL_REPORTE_TRANSACCIONES: string = environment.urlWebService + "/WebServiceRecobros-RESTServices-context-root/service/recobros/reporteT";
  
 constructor(private http: Http, private loc: Location){
 }

//----------------------------------- SERVICIO DE MENU LOGIN -----------------------------------------------------------------------//
 findMenuLogin(login: string, loginDN: string, pass:string, host: string, port:string, ldacase: string): any{
  return this.http.get(this.BASE_URL_LOGIN_MENU + '?login='+login +'&loginDN='+loginDN+'&pass='+pass+'&host='+host+'&port='+port+'&ldacase='+ldacase).pipe(map((res: Response)=> res.json()));
}

//----------------------------------- SERVICIO DE GESTOR MENÚ ----------------------------------------------------------------------//
findGestorMMenus(): any{
  return this.http.get(this.BASE_URL_GESTORM_MENUS).pipe(map((res: Response)=> res.json()));
}
putMenu(id: string, nombre: string, icono: string, menuPadre: string, descripcion: string): any{
  return this.http.put(this.BASE_URL_CONF_LISTA_EDITAR_MENU + '?id='+id +'&nombre='+nombre +'&icono='+icono + '&menuPadre='+menuPadre + '&descripcion=' + descripcion,{}).pipe(map((res: Response)=> res.json()));
}
saveMenu(nombre: string, icono: string, menuPadre: string, descripcion: string): any{
  return this.http.post(this.BASE_URL_CONF_LISTA_AGREGAR_MENU + '?nombre='+nombre +'&icono='+icono + '&menuPadre='+menuPadre + '&descripcion=' + descripcion, {}).pipe(map((res: Response)=> res.json()));
}
deleteMenu(id: string): any{
  return this.http.delete(this.BASE_URL_CONF_LISTA_ELIMINAR_MENU + '?id='+id).pipe(map((res: Response)=> res.json()));
}
findGestorMRoles(): any{
  return this.http.get(this.BASE_URL_GESTORM_ROLES).pipe(map((res: Response)=> res.json()));
}
putRol(id: string, nombre: string, descripcion: string, permisos: string): any{
  return this.http.put(this.BASE_URL_CONF_LISTA_EDITAR_ROL + '?id='+id +'&nombre='+nombre + '&descripcion=' + descripcion + '&permisos='+permisos,{}).pipe(map((res: Response)=> res.json()));
}
saveRol(nombre: string, descripcion: string): any{
  return this.http.post(this.BASE_URL_CONF_LISTA_AGREGAR_ROL + '?nombre='+nombre + '&descripcion=' + descripcion, {}).pipe(map((res: Response)=> res.json()));
}
deleteRol(id: string): any{
  return this.http.delete(this.BASE_URL_CONF_LISTA_ELIMINAR_ROL + '?id='+id).pipe(map((res: Response)=> res.json()));
}
findRolMenus(id: string){
  return this.http.get(this.BASE_URL_CONF_LISTA_ROLMENUS + '?id='+id).pipe(map((res: Response)=> res.json()));
}

//-----------------------------------SERVICIOS DE CONFIGURACION---------------------------------------------------------------------//
  //-----------------------------------SERVICIOS DE EXCEPCIONES------------------------------------------------//
    //------Clientes------------------//
  findConfExcepcionadoCliente(tipoD: number): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_CLIENTE + '?tipoD='+tipoD).pipe(map((res: Response)=> res.json()));
  } 
  findConfExcepcionadoTipoDCliente(): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_TIPOD_CLIENTE).pipe(map((res: Response)=> res.json()));
  } 
  SaveClienteExcepcionado(numD: string, tipoD: string, detalle: string, estado: string): any{
    return this.http.post(this.BASE_URL_SAVE_EXCEPCIONADO_CLIENTE + '?numeroDocumento='+numD+'&tipoDocumento='+ tipoD + '&detalle='+detalle+'&estado='+estado,{}).pipe(map((res: Response)=> res.json()));
  } 
  EditClienteExcepcionado(numD: string, tipoD: string, detalle: string, estado: string): any{
  return this.http.put(this.BASE_URL_EDIT_EXCEPCIONADO_CLIENTE + '?numeroDocumento='+numD+'&tipoDocumento='+ tipoD + '&detalle='+detalle+'&estado='+estado,{}).pipe(map((res: Response)=> res.json()));
  }   
  DeleteClienteExcepcionado(numD: string): any{
    return this.http.delete(this.BASE_URL_DELETE_EXCEPCIONADO_CLIENTE + '?numeroDocumento='+numD,{}).pipe(map((res: Response)=> res.json()));
  }   
    //------Cuentas-----------------//
  findConfExcepcionadoCuenta(): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_CUENTA).pipe(map((res: Response)=> res.json()));
  }
  findConfExcepcionadoListaTipoProducto(): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_TIPO_PRODUCTO).pipe(map((res: Response)=> res.json()));
  }
  SaveCuentaExcepcionada(numCuenta: string, codProducto:string, estado: string, detalle: string): any{
    return this.http.post(this.BASE_URL_SAVE_EXCEPCIONADO_CUENTA + '?numCuenta='+numCuenta+'&codProducto='+codProducto+'&estado='+estado+'&detalle='+detalle,{}).pipe(map((res: Response)=> res.json()));
  } 
  EditCuentaExcepcionada(id: string, numCuenta: string, codProducto:string, detalle: string, estado: string): any{
    return this.http.put(this.BASE_URL_EDIT_EXCEPCIONADO_CUENTA + '?id='+id+'&numCuenta='+numCuenta+'&codProducto='+codProducto+'&estado='+estado+'&detalle='+detalle,{}).pipe(map((res: Response)=> res.json()));
  }   
  DeleteCuentaExcepcionada(codigoCuenta: string): any{
    return this.http.delete(this.BASE_URL_DELETE_EXCEPCIONADO_CUENTA + '?codigoCuenta='+codigoCuenta,{}).pipe(map((res: Response)=> res.json()));
  }   
    //------Tipo Producto-----------------//  
  findConfExcepcionadoTipoProducto(tipoD: string): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_TIPOP + '?tipoD='+tipoD).pipe(map((res: Response)=> res.json()));
  }
  SaveTipoProductoExcepcionado(codProducto: string, estado:string, detalle: string): any{
    return this.http.post(this.BASE_URL_SAVE_EXCEPCIONADO_TIPOP + '?codProducto='+codProducto+'&estado='+estado+'&detalle='+detalle,{}).pipe(map((res: Response)=> res.json()));
  } 
  EditTipoProductoExcepcionado(id: string, codProducto:string, estado: string, detalle: string): any{
    return this.http.put(this.BASE_URL_EDIT_EXCEPCIONADO_TIPOP + '?id='+id+'&codProducto='+codProducto+'&estado='+estado+'&detalle='+detalle,{}).pipe(map((res: Response)=> res.json()));
  }   
  DeleteTipoProductoExcepcionado(codigoProducto: string): any{
    return this.http.delete(this.BASE_URL_DELETE_EXCEPCIONADO_TIPOP + '?codigoProducto='+codigoProducto,{}).pipe(map((res: Response)=> res.json()));
  } 
    //------Transacciones-----------------//  
  findConfExcepcionadoTransaccion(): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_TRANSACCION).pipe(map((res: Response)=> res.json()));
  } 
  //-----------------------------------SERVICIOS DE PARAMETROS APP----------------------------------------------//
  findConfParametroApp(): any{
    return this.http.get(this.BASE_URL_CONF_PARAMETROSAPP).pipe(map((res: Response)=> res.json()));
  } 
  SaveConfParametro(descripcion: string, valorCampo:string, nombre: string): any{
    return this.http.post(this.BASE_URL_SAVE_PARAMETROSAPP +'?descripcion='+descripcion+'&valorCampo='+valorCampo+'&nombre='+nombre,{}).pipe(map((res: Response)=> res.json()));
  } 
  EditConfParametro(id: string, descripcion: string, valorCampo:string, nombre: string): any{
    return this.http.put(this.BASE_URL_EDIT_PARAMETROSAPP + '?id='+id+'&descripcion='+descripcion+'&valorCampo='+valorCampo+'&nombre='+nombre,{}).pipe(map((res: Response)=> res.json()));
  }   
  DeleteConfParametro(codigoParametro: string): any{
    return this.http.delete(this.BASE_URL_DELETE_PARAMETROSAPP + '?codigoParametro='+codigoParametro,{}).pipe(map((res: Response)=> res.json()));
  }  

//---------------------------------SERVICIOS DE HERRAMIENTAS------------------------------------------------------------//
findHerramientasArqueo(fechaI: string, fechaF: string, codigoO: string): any{
  return this.http.get(this.BASE_URL_HERRAMIENTAS_ARQUEO + '?fechaI='+fechaI+'&fechaF='+fechaF+'&codigoO='+codigoO).pipe(map((res: Response)=> res.json()));
} 

//---------------------------------SERVICIOS DE ADMINISTRACIÓN-----------------------------------------------------------//
findAdministracionNotificacion(): any{
  return this.http.get(this.BASE_URL_ADMINISTRACION_NOTIFICACION).pipe(map((res: Response)=> res.json()));
} 
findAdministracionLog(fechaI: string, fechaF: string): any{
  return this.http.get(this.BASE_URL_ADMINISTRACION_LOG+ '?fechaI='+fechaI+'&fechaF='+fechaF).pipe(map((res: Response)=> res.json()));
} 
  //----------------Usuarios-------------------//
findAdministracionUsuario(): any{
  return this.http.get(this.BASE_URL_ADMINISTRACION_USUARIO).pipe(map((res: Response)=> res.json()));
} 
SaveAdmUsuario(login: string, nombreRol:string, email: string, nombre: string, estado: string): any{
  return this.http.post(this.BASE_URL_SAVE_USUARIO +'?login='+login+'&nombreRol='+nombreRol+'&email='+email+'&nombre='+nombre+'&estado='+estado,{}).pipe(map((res: Response)=> res.json()));
} 
EditAdmUsuario(id: string, login: string, nombreRol:string, email: string, nombre: string, estado: string): any{
  return this.http.put(this.BASE_URL_EDIT_USUARIO +'?id='+id+'&login='+login+'&nombreRol='+nombreRol+'&email='+email+'&nombre='+nombre+'&estado='+estado,{}).pipe(map((res: Response)=> res.json()));
}   

//---------------------------------SERVICIOS DE REPORTES-----------------------------------------------------------------//
  findByName(fechaI: string, fechaF: string): any{
    const angularRoute = this.loc.path();
    const url = window.location.href;
    const domainAndApp = url.replace(angularRoute, '');
    return this.http.get(this.BASE_URL_REPORTE_GENERAL + '?fechaI='+fechaI +'&fechaF='+fechaF).pipe(map((res: Response)=> res.json()));
  }
  findPendientes(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_PENDIENTES + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT).pipe(map((res: Response)=> res.json()));
  }
  findExitosos(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string, fechaCI: string, fechaCF: string): any{
    return this.http.get(this.BASE_URL_REPORTE_EXITOSOS + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT+'&fechaCI='+fechaCI+'&fechaCF='+fechaCF).pipe(map((res: Response)=> res.json()));
  }
  findNoCobrables(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_NOCOBRABLES + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT).pipe(map((res: Response)=> res.json()));
  }
  findClientesExcepcionados(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_CLIENTES_EXCEPCIONADOS + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT).pipe(map((res: Response)=> res.json()));
  }
  findCuentasExcepcionadas(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_CUENTAS_EXCEPCIONADAS + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT).pipe(map((res: Response)=> res.json()));
  }
  findExcepcionados(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_EXCEPCIONADOS + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT).pipe(map((res: Response)=> res.json()));
  }
  findTransaccionesExcepcionadas(fechaI: string, fechaF: string, numI:string, codigoO: string, numP:string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_TRANSACCIONES_EXCEPCIONADAS + '?fechaI='+fechaI +'&fechaF='+fechaF+'&numI='+numI+'&codigoO='+codigoO+'&numP='+numP+'&codigoT='+codigoT).pipe(map((res: Response)=> res.json()));
  }
  findTransacciones(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_REPORTE_TRANSACCIONES + '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT).pipe(map((res: Response)=> res.json()));
  }

  findUrlWebservice(): string{
    return environment.urlWebService;
  }
}