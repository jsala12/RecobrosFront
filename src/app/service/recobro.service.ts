import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class recobrosServices{
  context= environment.urlWebService+"/WebServiceRecobros-RESTServices-context-root/service/recobros";
  //-----------------------------------LOGIN-------------------------------------------------------------------------------//
  private BASE_URL_LOGIN_MENU: string = this.context+ "/IDM";//Logeo con IDM
  
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
  private BASE_URL_CONF_EXCEPCIONADO_CLIENTE_TOTAL: string = this.context+ "/ExcepcionadoCTotal";
  private BASE_URL_CONF_EXCEPCIONADO_TIPOD_CLIENTE: string = this.context+ "/ExcepcionadoCC";
  private BASE_URL_SAVE_EXCEPCIONADO_CLIENTE: string = this.context+ "/GuardarExc";
  private BASE_URL_DELETE_EXCEPCIONADO_CLIENTE: string = this.context+ "/EliminarExc"; 
  private BASE_URL_EDIT_EXCEPCIONADO_CLIENTE: string = this.context+ "/EditarExc"; 
      //-------------------Cuentas-------------------------------//
      private BASE_URL_CONF_EXCEPCIONADO_TIPO_PRODUCTO: string = this.context+ "/ExcepcionadoCPC";
      private BASE_URL_CONF_EXCEPCIONADO_CUENTA: string = this.context+ "/ExcepcionadoCU";
  private BASE_URL_SAVE_EXCEPCIONADO_CUENTA: string = this.context+ "/GuardarExcCU";
  private BASE_URL_DELETE_EXCEPCIONADO_CUENTA: string = this.context+ "/EliminarExcCU"; 
  private BASE_URL_EDIT_EXCEPCIONADO_CUENTA: string = this.context+ "/EditarExcCU"; 
      //-------------------Tipo productos------------------------//
  private BASE_URL_CONF_EXCEPCIONADO_TIPOP: string = this.context+ "/ExcepcionadoP";
  private BASE_URL_CONF_EXCEPCIONADO_TIPOP_TOTAL: string = this.context+ "/ExcepcionadoPTotal";
  private BASE_URL_SAVE_EXCEPCIONADO_TIPOP: string = this.context+ "/GuardarExcP";
  private BASE_URL_DELETE_EXCEPCIONADO_TIPOP: string = this.context+ "/EliminarExcP"; 
  private BASE_URL_EDIT_EXCEPCIONADO_TIPOP: string = this.context+ "/EditarExcP"; 
      //-------------------Transacciones-------------------------//
  private BASE_URL_LISTA_TRANSACCIONES: string = this.context+ "/ListaTransacciones";
  private BASE_URL_CONF_EXCEPCIONADO_TRANSACCION: string = this.context+ "/ExcepcionadoT"; 
  private BASE_URL_SAVE_TRANSACCION: string = this.context+ "/GuardarExcT";
  private BASE_URL_DELETE_TRANSACCION: string = this.context+ "/EliminarExcT"; 
  private BASE_URL_EDIT_TRANSACCION: string = this.context+ "/EditarExcT"; 
    //----------------------CLIENTES ESPECIALES--------------------------//
    private BASE_URL_LISTA_REC_CLIENTES: string = this.context+ "/RecClientes";
    private BASE_URL_LISTA_REC_CLIENTEODS: string = this.context+ "/RecClienteODS";
    private BASE_URL_LISTA_REC_CLIENTE: string = this.context+ "/RecCliente";
    private BASE_URL_LISTA_REC_CLIENTES_ESPECIALES: string = this.context+ "/RecClientesEspeciales";
    private BASE_URL_LISTA_REC_CLIENTES_ESPECIALESD: string = this.context+ "/RecClientesEspecialesD";
    private BASE_URL_LISTA_REC_CLIENTE_CUENTAS: string = this.context+ "/RecClienteCuentas";
    private BASE_URL_LISTA_REC_CUENTAS_AHORRO_CLIENTE: string = this.context+ "/RecCuentasAhorroCliente";
    private BASE_URL_LISTA_REC_CUENTAS_CORRIENTE_CLIENTE: string = this.context+ "/RecCuentasCorrienteCliente";
    private BASE_URL_LISTA_REC_CLIENTE_CUENTAS_ESPECIALES: string = this.context+ "/RecClienteCuentasEspeciales";
    private BASE_URL_SAVE_CLIENTES_ESPECIALES: string = this.context+ "/GuardarClienteEspecial";
    private BASE_URL_DELETE_CLIENTES_ESPECIALES: string = this.context+ "/EliminarClienteEspecial";
    private BASE_URL_DELETE_CLIENTES_ESPECIALES_TODO: string = this.context+ "/EliminarClienteEspecialTodo";
    private BASE_URL_LISTA_CONF_REC_CLIENTE_ESPECIAL: string = this.context+ "/ConfRecClienteEspeciales";
    private BASE_URL_LISTA_REC_CLIENTES_ESPECIALES_TRANSACCIONES_CONF: string = this.context+ "/RecClientesEspecialesTransaccionesConf";
    private BASE_URL_SAVE_REC_CLIENTE: string = this.context+ "/GuardarRecCliente";
    private BASE_URL_SAVE_REC_CUENTA: string = this.context+ "/GuardarRecCuenta";
    private BASE_URL_SAVE_REC_CUENTAS: string = this.context+ "/GuardarRecCuentas";

    //-----------------------------------PARAMETROS APP--------------------------------------------------------//
  private BASE_URL_CONF_PARAMETROSAPP: string = this.context+ "/ExcepcionadoPN";
  private BASE_URL_SAVE_PARAMETROSAPP: string = this.context+ "/GuardarParam";
  private BASE_URL_DELETE_PARAMETROSAPP: string = this.context+ "/EliminarParam"; 
  private BASE_URL_EDIT_PARAMETROSAPP: string = this.context+ "/EditarParam";
  //-----------------------------------HERRAMIENTAS------------------------------------------------------------------------//
  private BASE_URL_HERRAMIENTAS_ARQUEO: string = this.context+ "/Arqueo";
  private BASE_URL_HERRAMIENTAS_ARQUEO_GENERAL: string = this.context+ "/ArqueoGeneral";
  
  //-----------------------------------ADMINISTRACIÓN----------------------------------------------------------------------//
  private BASE_URL_ADMINISTRACION_NOTIFICACION: string = this.context+ "/AdministracionN";
  private BASE_URL_ADMINISTRACION_LOG: string = this.context+ "/AdministracionL";
  private BASE_URL_SAVE_LOG: string= this.context+ "/GuardarLog";
  private BASE_URL_ADMINISTRACION_USUARIO: string = this.context+ "/AdministracionU";
  private BASE_URL_SAVE_USUARIO: string= this.context+ "/GuardarUsuario";
  private BASE_URL_EDIT_USUARIO: string= this.context+ "/EditarUsuario";
  private BASE_URL_ENVIAR_NOTIFICACION: string= this.context+ "/Email";

  //-----------------------------------CONFIGURACIÓN DE INFORME-----------------------------------------------------------//
  private BASE_URL_INFORME_REGISTROS_CARGADOS: string = this.context+ "/recobrosCargados";
  private BASE_URL_INFORME_DEUDAS_CREADAS: string = this.context+ "/deudasCreadas";
  private BASE_URL_INFORME_COBROS: string = this.context+ "/cobrosCreados";
  private BASE_URL_INFORME_IPENDIENTES: string = this.context+ "/pendientes";
  private BASE_URL_INFORME_REGISTROS_CARGADOS_MES: string = this.context+ "/registrosCreadosMes";
  private BASE_URL_INFORME_DEUDAS_CREADAS_MES: string = this.context + "/deudasCreadasMes";
  private BASE_URL_INFORME_COBROS_CREADOS_MES: string = this.context + "/cobrosCreadosMes";
  private BASE_URL_INFORME_PENDIENTE_COBRAR_MES: string = this.context + "/pendienteCobrarMes";
  private BASE_URL_INFORME_REGISTROS_CARGADOS_MES_VS: string = this.context+ "/cargadosPorMes";
  private BASE_URL_INFORME_DEUDAS_CREADAS_MES_VS: string = this.context+ "/deudasCreadasPorMes";
  private BASE_URL_INFORME_REGISTROS_RECHAZADOS_FECHA_CARGA: string = this.context+ "/fechaRechazoFechaCargue";
  private BASE_URL_INFORME_RECHAZADOS_COBROS: string = this.context+ "/deudasCobros";
  private BASE_URL_INFORME_DEUDAS_MES: string = this.context+ "/deudasPorMes";
  private BASE_URL_INFORME_COBROS_MES: string = this.context+ "/cobrosPorMes";
  private BASE_URL_INFORME_IRRECUDIARIO: string = this.context+ "/irrecudiarioCompleto";
  private BASE_URL_INFORME_DEUDAS: string = this.context+ "/deudasCompleto";
  private BASE_URL_INFORME_TODOS_PENDIENTE: string = this.context+ "/pendientesCompleto";
  private BASE_URL_INFORME_ICOBROS: string = this.context+ "/cobrosCompleto";
  private BASE_URL_INFORME_INCOBRABLES: string = this.context+ "/incobrablesCompleto";
  private BASE_URL_INFORME_IEXCEPCIONADOS: string = this.context+ "/excepcionadasCompleto";
  private BASE_URL_INFORME_CARGADOS_TRANSACCION: string = this.context+ "/cargadosPorTransaccion";
  private BASE_URL_INFORME_EXCEPCION_CUENTA: string = this.context+ "/excepcionPorCuenta";
  private BASE_URL_INFORME_EXCEPCION_CLIENTE: string = this.context+ "/excepcionPorCliente";
  private BASE_URL_INFORME_EXCEPCION_PRODUCTO: string = this.context+ "/excepcionPorProducto";
  private BASE_URL_INFORME_DEUDAS_INCOBRABLES: string = this.context+ "/incobrables";
  
  //-----------------------------------CONFIGURACIÓN DE CONSULTAS-----------------------------------------------------------//
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
 findMenuLogin(login: string, password: string): any{
  return this.http.get(this.BASE_URL_LOGIN_MENU + '?login='+login +'&password='+password)
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
  findConfExcepcionadoClienteTotal(): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_CLIENTE_TOTAL)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  } 
  findConfExcepcionadoTipoDCliente(): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_TIPOD_CLIENTE)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  } 
  SaveClienteExcepcionado(numD: string, tipoD: string, detalle: string, estado: string, usrautoriza: string): any{
    return this.http.post(this.BASE_URL_SAVE_EXCEPCIONADO_CLIENTE + '?numeroDocumento='+numD+'&tipoDocumento='+ tipoD + '&detalle='+detalle+'&estado='+estado+'&usrautoriza='+usrautoriza,{})
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
  SaveCuentaExcepcionada(numCuenta: string, codProducto:string, estado: string, detalle: string, usrautoriza: string): any{
    return this.http.post(this.BASE_URL_SAVE_EXCEPCIONADO_CUENTA + '?numCuenta='+numCuenta+'&codProducto='+codProducto+'&estado='+estado+'&detalle='+detalle+'&usrautoriza='+usrautoriza,{})
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
  findConfExcepcionadoTipoProductoTotal(): any{
    return this.http.get(this.BASE_URL_CONF_EXCEPCIONADO_TIPOP_TOTAL)
    .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
  }
  SaveTipoProductoExcepcionado(codProducto: string, estado:string, detalle: string, autoriza:string): any{
    return this.http.post(this.BASE_URL_SAVE_EXCEPCIONADO_TIPOP + '?codProducto='+codProducto+'&estado='+estado+'&detalle='+detalle+'&autoriza='+autoriza,{})
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
    SaveTransaccion(codTransaccion: string, estado:string, detalle: string, autoriza: string): any{
      return this.http.post(this.BASE_URL_SAVE_TRANSACCION + '?codigoTransaccion='+codTransaccion+'&estado='+estado+'&detalle='+detalle+'&autoriza='+autoriza,{})
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
    //-----------------------------------SERVICIOS DE CLIENTES ESPECIALES--------------------------------------//  
    findRecClientes(): any{
      return this.http.get(this.BASE_URL_LISTA_REC_CLIENTES)
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    findRecClienteODS(tipoDocumento: string, numDocumento: string): any{
      return this.http.get(this.BASE_URL_LISTA_REC_CLIENTEODS + '?tipoDocumento='+tipoDocumento+ '&numDocumento='+numDocumento,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    findRecCliente(tipoDocumento: string, numDocumento: string): any{
      return this.http.get(this.BASE_URL_LISTA_REC_CLIENTE + '?tipoDocumento='+tipoDocumento+ '&numDocumento='+numDocumento,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    findRecClientesEspeciales(): any{
      return this.http.get(this.BASE_URL_LISTA_REC_CLIENTES_ESPECIALESD)
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    findRecClientesEspecialesD(): any{
      return this.http.get(this.BASE_URL_LISTA_REC_CLIENTES_ESPECIALESD)
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    findConfRecClienteEspecial(numDocumento: string): any{
      return this.http.get(this.BASE_URL_LISTA_CONF_REC_CLIENTE_ESPECIAL+'?numDocumento='+numDocumento, {})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    findClienteCuentas(idClienteRec: string): any{
      return this.http.get(this.BASE_URL_LISTA_REC_CLIENTE_CUENTAS+ '?idClienteRec='+idClienteRec,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    findCuentasAhorroCliente(tipoDocumento: string, numDocumento: string, digitoTipoN: string): any{
      return this.http.get(this.BASE_URL_LISTA_REC_CUENTAS_AHORRO_CLIENTE+ '?numDocumento='+numDocumento+'&tipoDocumento='+tipoDocumento+'&digitoTipoN='+digitoTipoN,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    findCuentasCorrienteCliente(tipoDocumento: string, numDocumento: string, digitoTipoN: string): any{
      return this.http.get(this.BASE_URL_LISTA_REC_CUENTAS_CORRIENTE_CLIENTE+ '?numDocumento='+numDocumento+'&tipoDocumento='+tipoDocumento+'&digitoTipoN='+digitoTipoN,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    findClienteCuentasEspeciales(numDocumento: string, tipoDocumento: string, codTransaccion: string, tipoTransaccion: string): any{
      return this.http.get(this.BASE_URL_LISTA_REC_CLIENTE_CUENTAS_ESPECIALES+ '?numDocumento='+numDocumento+'&tipoDocumento='+tipoDocumento+'&codTransaccion='+codTransaccion+'&tipoTransaccion='+tipoTransaccion,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    findClienteEspecialesTransaccionesConf(numDocumento: string, tipoDocumento: string): any{
      return this.http.get(this.BASE_URL_LISTA_REC_CLIENTES_ESPECIALES_TRANSACCIONES_CONF+ '?numDocumento='+numDocumento+'&tipoDocumento='+tipoDocumento,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    SaveClienteEspecial(numDocumento: string, tipoDocumento: string, codTransaccion: string, tipoTransaccion: string, cuenta: string, tipoCuenta: string): any{
      return this.http.post(this.BASE_URL_SAVE_CLIENTES_ESPECIALES + '?numDocumento='+numDocumento+'&tipoDocumento='+tipoDocumento+'&codTransaccion='+codTransaccion+'&tipoTransaccion='+tipoTransaccion+'&cuenta='+cuenta+'&tipoCuenta='+tipoCuenta,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    DeleteClienteEspecial(tipoDocumento: string, numDocumento: string, codTransaccion: string): any{
      return this.http.delete(this.BASE_URL_DELETE_CLIENTES_ESPECIALES + '?tipoDocumento='+tipoDocumento+'&numDocumento='+numDocumento+'&codTransaccion='+codTransaccion,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    DeleteClienteEspecialTodo(numDocumento: string): any{
      return this.http.delete(this.BASE_URL_DELETE_CLIENTES_ESPECIALES_TODO + '?numDocumento='+numDocumento,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    SaveRecCliente(nombre: string, tipoDocumento: string, numDocumento: string, segmento: string, flgEspecial: string): any{
      return this.http.post(this.BASE_URL_SAVE_REC_CLIENTE + '?nombre='+nombre+'&tipoDocumento='+tipoDocumento+'&numDocumento='+numDocumento+'&segmento='+segmento+'&flgEspecial='+flgEspecial,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }
    SaveRecCuenta(tipoProd: string, numProd: string, cliente: string, estado: string, marcaInacMov: string, saldoActual: string, 
                  fechaSaldo: string, flagMarca: string, saldoNotifAumento: string, fechaNotifAumento: string, sobregiro: string,
                  flagMaestra: string, estadoMarcacion: string, titularidad: string, codProd: string, codigoMensajeMqMarcacion: string,
                  codigoOficina: string, tramaEnviada: string, tramaRecibida: string, codigoMensajeMqSaldo: string, tramaEnviadaSaldo: string,
                  tramaRecibidaSaldo: string, flagSaldo: string): any{
      return this.http.post(this.BASE_URL_SAVE_REC_CUENTA + '?tipoProd='+tipoProd+'&numProd='+numProd+'&cliente='+cliente+'&estado='+estado+'&marcaInacMov='+marcaInacMov+'&saldoActual='+saldoActual
                            +'&fechaSaldo='+fechaSaldo+'&flagMarca='+flagMarca+'&saldoNotifAumento='+saldoNotifAumento+'&fechaNotifAumento='+fechaNotifAumento
                            +'&sobregiro='+sobregiro+'&flagMaestra='+flagMaestra+'&estadoMarcacion='+estadoMarcacion+'&titularidad='+titularidad
                            +'&codProd='+codProd+'&codigoMensajeMqMarcacion='+codigoMensajeMqMarcacion+'&codigoOficina='+codigoOficina+'&tramaEnviada='+tramaEnviada
                            +'&tramaRecibida='+tramaRecibida+'&codigoMensajeMqSaldo='+codigoMensajeMqSaldo+'&tramaEnviadaSaldo='+tramaEnviadaSaldo+'&tramaRecibidaSaldo='+tramaRecibidaSaldo
                            +'&flagSaldo='+flagSaldo,{})
      .pipe(map((res: Response)=> res.json()),catchError(error => {return throwError(error.status +" "+ error.statusText);}));
    }

    SaveRecCuentas(cuentas:any): any{
      return this.http.post(this.BASE_URL_SAVE_REC_CUENTAS, cuentas)
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
findHerramientasArqueoGeneral(): any{
  return this.http.get(this.BASE_URL_HERRAMIENTAS_ARQUEO_GENERAL)
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
enviarNotificacion(menuP: string, descripcion: string, login: string, accion: string, autoriza: string){
  return this.http.get(this.BASE_URL_ENVIAR_NOTIFICACION + '?nombreMenu='+ menuP+ '&descripcion='+descripcion+'&login='+login+'&accion='+accion+'&autoriza='+autoriza, {})
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

//--------------------------------SERVICIOS DE INFORMES------------------------------------------------------------------//
  findRegistrosCargados(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_REGISTROS_CARGADOS+ '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findDeudasCreadas(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_DEUDAS_CREADAS+ '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findCobros(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_COBROS+ '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findIpendientes(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_IPENDIENTES+ '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findRegistrosCargadosMes(): any{
    return this.http.get(this.BASE_URL_INFORME_REGISTROS_CARGADOS_MES)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findDeudasCreadasMes(): any{
    return this.http.get(this.BASE_URL_INFORME_DEUDAS_CREADAS_MES)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findCobrosCreadosMes(): any{
    return this.http.get(this.BASE_URL_INFORME_COBROS_CREADOS_MES)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findPendienteCobrarMes(): any{
    return this.http.get(this.BASE_URL_INFORME_PENDIENTE_COBRAR_MES)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findRegistrosCargadosMesVs(codigoT: string): any{
    return this.http.get(this.BASE_URL_INFORME_REGISTROS_CARGADOS_MES_VS+'?codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findDeudasCreadasMesVs(codigoT: string): any{
    return this.http.get(this.BASE_URL_INFORME_DEUDAS_CREADAS_MES_VS+'?codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findCargadosTransaccion(codigoT: string): any{
    return this.http.get(this.BASE_URL_INFORME_CARGADOS_TRANSACCION+'?codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
    }  
  findExcCuenta(codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_EXCEPCION_CUENTA+'?codigoT='+codigoT)
      .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));
  }  
  findExcCliente(codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_EXCEPCION_CLIENTE+'?codigoT='+codigoT)
      .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));
  }
  findExcProducto(codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_EXCEPCION_PRODUCTO+'?codigoT='+codigoT)
      .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));
  }
  findDeudasIncobrables(codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_DEUDAS_INCOBRABLES+'?codigoT='+codigoT)
      .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));
  }
  findRegistrosRechazadosFechaCarga(codigoT: string): any{
    return this.http.get(this.BASE_URL_INFORME_REGISTROS_RECHAZADOS_FECHA_CARGA+'?codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findRechazadosCobros(codigoT: string): any{
    return this.http.get(this.BASE_URL_INFORME_RECHAZADOS_COBROS+'?codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findDeudasMes(codigoT: string): any{
    return this.http.get(this.BASE_URL_INFORME_DEUDAS_MES+'?codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findCobrosMes(codigoT: string): any{
    return this.http.get(this.BASE_URL_INFORME_COBROS_MES+'?codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findIrrecuadiario(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_IRRECUDIARIO+ '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
  }
  findDeudas(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_DEUDAS+ '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
   }
  findTodosPendientes(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_TODOS_PENDIENTE+ '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
   }
  findIcobros(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_ICOBROS+ '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
   }
  findIncobrables(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_INCOBRABLES+ '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
   }
  findIExcepcionados(fechaI: string, fechaF: string, codigoT:string): any{
    return this.http.get(this.BASE_URL_INFORME_IEXCEPCIONADOS+ '?fechaI='+fechaI +'&fechaF='+fechaF+'&codigoT='+codigoT)
    .pipe(map((res: Response)=> res.json()),catchError(error => {  return throwError(error.status +" "+ error.statusText);}));  
   }

//---------------------------------SERVICIOS DE CONSULTAS-----------------------------------------------------------------//
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