import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ListaclientesespecialesDataSource, ListaclientesespecialesItem } from './listaclientesespeciales-datasource';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../excepciones/cliente/cliente.component';
import { recobrosServices } from 'src/app/service/recobro.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Global } from 'src/app/global';
import { AuthService } from 'src/app/auth.service';
import AutoNumeric from 'autonumeric';

/*export class CuentasCliente {
  tipoProd: string;
  numProd: string;
  cliente: string;
  estado: string;
  marcaInacMov: string;
  saldoActual: string;
  fechaSaldo: string;
  flagMarca: string;
  saldoNotifAumento: string;
  fechaNotifAumento:string;
  sobregiro: string;
  flagMaestra: string;
  estadoMarcacion: string;
  titularidad: string;
  codProd: string;
  codigoMensajeMqMarcacion: string;
  codigoOficina: string;
  tramaEnviada:string;
  tramaRecibida: string;
  codigoMensajeMqSaldo: string;
  tramaEnviadaSaldo: string;
  tramaRecibidaSaldo: string;
  flagSaldo: string;
}*/

export interface User {
  identificacion: string;
  nombreCliente: string;
}

@Component({
  selector: 'app-listaclientesespeciales',
  templateUrl: './listaclientesespeciales.component.html',
  styleUrls: ['./listaclientesespeciales.component.css']
})
export class ListaclientesespecialesComponent implements AfterViewInit, OnInit {
  numeroDocumentoControl = new FormControl('', [Validators.required,]);
  codigoTransaccionControl = new FormControl('', [Validators.required,]); 
  tipoIdentificacionControl = new FormControl('', [Validators.required,]); 
  cuentasCobrarControl = new FormControl('', [Validators.required,]); 
  numeroDocumentoControlEditar = new FormControl('', [Validators.required,]);
  codigoTransaccionControlEditar = new FormControl('', [Validators.required,]); 
  codigoTransaccionControlVer = new FormControl('', [Validators.required,]); 
  cuentasCobrarControlEditar = new FormControl('', [Validators.required,]); 
  toppingsCuentas = new FormControl();
  toppingsCuentasAux = new FormControl();   
  
  matcher = new MyErrorStateMatcher();

  myControl = new FormControl('', [Validators.required,]);
  
  options =[];

  filteredOptions: Observable<string[]>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListaclientesespecialesItem>;
  dataSource: ListaclientesespecialesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['tipoDocumento', 'numDocumento', 'nombreClienteEspecial', "ver", 'editar', 'eliminar'];
  tipoClientes = [];
  headerModal: string;
  selectedTipoDocumento: any;
  selectedCodigoTransaccion: any;
  cuentasCobrar: any;
  numeroDocumento: any;
  codigosTransaccion=[];
  codigosTransaccionA=[];
  cuentas=[];
  cuentasA=[];
  cuentasAA=[]
  cuentasAhorroCliente=[];
  cuentasAhorro=[];
  cuentasCorriente=[];
  recClientes=[];
  datosP=[];
  datosPE=[];
  datosPT=[];
  datosPC=[];
  datosPEP=[];
  nombreUsuario: string;
  tipoIdent: any;
  nombreClienteEspecial: any;
  idClienteRec: any;
  identificacionUsuario: any;
  codTransaccion: string;
  selectedCodTransaccion: any;  
  confClienteEspecial=[];
  cuentasClienteTransaccionCobrar: any;
  cuentasClienteTransaccionCobrarL: any;
  clienteEspecialTransacciones=[];
  tiposIdentificacion=[];
  tipoIdentIdentificacion: string;
  numeroDocumentoC: string;
  segmentoRecCliente: any;
  i: number;
  numeroDocumentoN: any;
  digitoTipoN: string;
  numeroDocumentoCA: any;
  cuentasCorrienteCliente= [];
  tipoCuenta="";
  cuentasTipo=[];
  cuentasTipoA=[];
  cuentasTipoAA=[];
  numeroDeCuentas: any;
  clienteEspecialTransaccionesL: any;
  tipoProductos=[];
  cuentasCorrienteTipo=[];
  cuentasAhorroTipo=[];
  banderaExcepcionado: number;
  tipoIdentA: any;
  bandera: number;
  numeroDocumentoA: any;

  constructor(public authService: AuthService, private global: Global, private alertService: AlertService, private spinner: NgxSpinnerService, private recobrosService: recobrosServices) {
  }

  ngOnInit() { 
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------//   
    this.spinner.show();   
    this.banderaExcepcionado=0;
    this.tiposIdentificacion=['A', 'B', 'C', 'E', 'I', 'L', 'N', 'P', 'R', 'S', 'T'];
    this.dataSource = new ListaclientesespecialesDataSource(); 
    //Carga los tipos de documento
    this.recobrosService.findConfExcepcionadoTipoDCliente().subscribe(data => {
      this.tipoClientes = data;
    }, error => { 
      this.alertService.warning("No se pudieron cargar los tipos de documento");
    });  

    //Carga la lista de productos
    this.recobrosService.findConfExcepcionadoListaTipoProducto().subscribe(data => {
      for(var _i=0 ; _i<data.length; _i++){
        this.tipoProductos=[ ...this.tipoProductos, { codigo: (data[_i])["id"]["codigoProducto"], tipo: (data[_i])["id"]["tipoProducto"],
          nombre: (data[_i])["nombre"] }  
          ];
      }
    }, error => { 
      this.alertService.warning("No se pudo cargar los tipos de productos: "+error);
    });    

    //Busca todos los clientes de la tabla rec_clientes
    this.recobrosService.findRecClientes().subscribe(data => {
      for(var _i=0 ; _i<data.length; _i++){
        this.options=[ ...this.options, { idClienteRec: data[_i]["idClienteRec"], identificacion: data[_i]["numIdent"], 
        nombre: data[_i]["nombre"], tipoId: data[_i]["tipoIdent"] }  
        ];
      }
      //Busca todos los clientes (Distintos) de la tabla rec_clientesespeciales (Esto se hace para tomar el nombre del usuario)
      this.recobrosService.findRecClientesEspecialesD().subscribe(data1 => {  
        for(var _i=0 ; _i<data1.length; _i++){
          this.nombreClienteEspecial="No registrado en recobros";          
          for(let usuario of data){      
            if(usuario.numIdent == (data1[_i])[0]){
              this.nombreClienteEspecial= usuario.nombre;
              break;
            }
          }
          this.datosP= [ ...this.datosP, { tipoDocumento: (data1[_i])[1], 
                            numDocumento: (data1[_i])[0] , nombreClienteEspecial: this.nombreClienteEspecial
                          }  
          ]; 
        }
        this.dataSource.data=  this.datosP;
      }, error => { 
        this.alertService.warning("No se pudo cargar la información de los clientes especiales: "+error);
        this.dataSource.data= [];
        this.spinner.hide(); 
      });
    }, error => { 
      this.alertService.warning("No se pudo cargar la información de los clientes de recobros: "+error);
    }); 
    
    //Excepciones por transaccion
    this.recobrosService.findConfExcepcionadoTransaccion().subscribe(data1 => {
      for(var _i=0 ; _i<data1.length; _i++){
        this.datosPT= [ ...this.datosPT, { codigo: (data1[_i])["codigoExcepcion"],
                          estado:  ((data1[_i])["codigoEstadoExcepcion"])["nombre"]}  
        ];
      }
    }, error => { 
      this.alertService.warning("No se pudo cargar la información de excepciones a transacciones: "+error);
    });

    //Filtramos las transacciones, para que queden las no excepcionadas
    this.recobrosService.findListaTransacciones().subscribe(data => {
      for(var _i=0 ; _i<data.length; _i++){
        this.codigosTransaccionA=[ ...this.codigosTransaccionA, { codigo: data[_i][0], 
        nombre: data[_i][1] }  
        ];
      }     
      for(let codigoTransaccionA of this.codigosTransaccionA){
        this.bandera=0;
        for(let datoPT of this.datosPT){
          if(codigoTransaccionA.codigo== datoPT.codigo && datoPT.estado=="ACTIVO"){ 
            this.bandera=1;
            console.log("Tx "+codigoTransaccionA.codigo+" está excepcionada");
            break;
          }
        }
        if(this.bandera==0){
          this.codigosTransaccion=[ ...this.codigosTransaccion, { codigo: codigoTransaccionA.codigo, 
            nombre: codigoTransaccionA.nombre }  
          ];
        }      
      }
    }, error => { 
      this.alertService.warning("No se pudo cargar la información de excepciones a transacciones: "+error);
      this.spinner.hide();
    });
    //Buscamos cuentas excepcionadas
    this.recobrosService.findConfExcepcionadoCuenta().subscribe(data => {
      for(var _i=0 ; _i<data.length; _i++){
        this.datosPC= [ ...this.datosPC, {numeroCuenta: (data[_i])["numeroCuenta"], tipo:(data[_i])["tipoProducto"] , estado: ((data[_i])["codigoEstadoExcepcion"])["nombre"]}  
        ];        
      }
    }, error => { 
      this.alertService.warning("No se pudo cargar la información de excepciones a cuentas: "+error);
    }); 
    //Busca las excepciones por cliente
    this.recobrosService.findConfExcepcionadoClienteTotal().subscribe(data1 => {
      for(var _i=0 ; _i<data1.length; _i++){
        this.datosPE= [ ...this.datosPE, { documento: "0"+(data1[_i])["codigoArchivoDiario"], 
                          tipo: ((data1[_i])["codigoTipoDocumento"])["codigoTipoDocumento"], estado: ((data1[_i])["codigoEstadoExcepcion"])["nombre"]}  
        ];
      }
    }, error => { 
      this.alertService.warning("No se pudo cargar la información de excepciones a clientes: "+error);
    });   
    //Busca las excepciones por tipo producto
    this.recobrosService.findConfExcepcionadoTipoProductoTotal().subscribe(data => {
      console.log(data);
      for(var _i=0 ; _i<data.length; _i++){
        this.datosPEP= [ ...this.datosPEP, { tipoProducto: (data[_i])["tipoProducto"], codigoProducto: (((data[_i])["codigoProducto"])["id"])["codigoProducto"],
                          estado:  ((data[_i])["codigoEstadoExcepcion"])["nombre"]}
        ];
      }
    }, error => { 
      this.alertService.warning("No se pudo cargar la información de excepciones a tipos de productos: "+error);
    });    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.spinner.hide();
  }
  private delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  agregarRegistro(){       
    this.headerModal="Agregar cliente especial";
    (<HTMLInputElement>document.getElementById("numDocumento")).value="";
    this.nombreUsuario="";
    this.tipoIdent="";
    (<HTMLInputElement>document.getElementById("codigoTransaccion")).value="";
    this.cuentas=[];
    this.toppingsCuentas = new FormControl(); 
    this.toppingsCuentas.setValue([]);
    this.toppingsCuentasAux = new FormControl(); 
    this.toppingsCuentasAux.setValue([]);
    this.myControl = new FormControl('', [Validators.required,]);
    this.numeroDocumentoControl = new FormControl('', [Validators.required,]);
    this.codigoTransaccionControl = new FormControl('', [Validators.required,]); 
    this.cuentasCobrarControl = new FormControl('', [Validators.required,]); 
    this.tipoIdentificacionControl = new FormControl('', [Validators.required,]);
  }

  cargarCuentasConfiguradas(){        
    this.recobrosService.findClienteCuentasEspeciales(this.identificacionUsuario, this.tipoIdent, this.selectedCodTransaccion, '00').subscribe(data => {      
      this.toppingsCuentas.setValue(data);  
      this.toppingsCuentasAux.setValue(data);
      this.cuentasClienteTransaccionCobrar= data;
      this.cuentasClienteTransaccionCobrarL = this.cuentasClienteTransaccionCobrar.length;
    }, error => { 
      this.alertService.warning("No se pudieron cargar las cuentas configuradas del cliente: "+error);
    });
  }

  consultarCliente(){  
    this.spinner.show();
    this.digitoTipoN='';
    this.cuentas=[]; 
    this.cuentasAhorro=[];
    this.cuentasAhorroCliente=[];
    this.cuentasCorriente=[];
    this.cuentasCorrienteCliente=[];

    for(let tipoId of this.tipoClientes){
      if(tipoId.tipo== this.tipoIdent){
        this.tipoIdentA= tipoId.codigoTipoDocumento;
        break;
      }
    }    

    console.log(this.datosPE);
    this.numeroDocumento= (<HTMLInputElement>document.getElementById("numDocumento")).value;
    this.numeroDocumentoA= this.numeroDocumento;
    if(this.tipoIdent=="N"){
      while(this.numeroDocumentoA.length<12){this.numeroDocumentoA="0"+this.numeroDocumentoA;}
    }else{
      while(this.numeroDocumentoA.length<11){this.numeroDocumentoA="0"+this.numeroDocumentoA;}
    }    
    this.recobrosService.findRecClienteODS(this.tipoIdent, this.numeroDocumento).subscribe(data => { 
      if(data.length==0){
        this.alertService.warning("El cliente no existe, verifique el tipo o el número de documento");  
        this.spinner.hide();      
        this.nombreUsuario="";
      }else{
        this.nombreUsuario= (data[0])[0]; 
        this.segmentoRecCliente= (data[0])[3];        
        this.numeroDocumentoC= this.numeroDocumento
        while(this.numeroDocumentoC.length<11){this.numeroDocumentoC="0"+this.numeroDocumentoC;} // Completa con 0 si el número ingresado tiene menos de 11 caracteres

        if(this.tipoIdent== 'N'){
          this.numeroDocumentoCA= this.numeroDocumentoC;
          while(this.numeroDocumentoCA.length<11){this.numeroDocumentoCA="0"+this.numeroDocumentoCA;}
          while(this.numeroDocumentoC.length<12){this.numeroDocumentoC="0"+this.numeroDocumentoC;} //Tiene 12 caracteres con el digito adicional de ODS para tipo N
          this.numeroDocumentoN = '';
          for(this.i=0; this.i<this.numeroDocumentoC.length; this.i++){
            if(this.numeroDocumentoC.length-1>this.i){
              this.numeroDocumentoN = this.numeroDocumentoN+ this.numeroDocumentoC.charAt(this.i);
            }else{
              this.digitoTipoN= this.numeroDocumentoC.charAt(this.i);//El último caracter corresponde al digito adicional en ODS para clientes con tipo identidad N
            }                       
          }
          this.numeroDocumentoC= this.numeroDocumentoN;          
        }        

        this.banderaExcepcionado=0;
        for(let dato of this.datosPE){
          if(dato.documento==this.numeroDocumentoA && dato.tipo== this.tipoIdentA && dato.estado=='ACTIVO'){
            this.banderaExcepcionado=1;
            break;           
          }
        }

        if(this.banderaExcepcionado==1){
          this.spinner.hide();
          this.alertService.warning("El cliente está excepcionado, no se puede configurar como cliente especial.");
        }else{
          console.log("No está excepcionado "+this.numeroDocumentoA+" - "+this.tipoIdentA);
          this.consultarCuentasCliente(); 
        }         
      }      
    }, error => { 
      this.alertService.warning("No se pudo verificar el cliente la información del cliente: "+error);
      this.nombreUsuario="";
      this.spinner.hide();
    });   
  }

  consultarCuentasCliente(){
    console.log("----------------Entró a consultar las cuentas del cliente "+this.tipoIdent+" " +this.numeroDocumentoC+" "+this.digitoTipoN+" de ODS---------------");
    this.cuentas=[];
    this.cuentasA=[];
    this.cuentasAA=[];
    this.cuentasCorrienteTipo=[];
    this.cuentasAhorroTipo=[];
    console.log("--------------------Cuentas de ahorro----------------");
    //--------------------------------------Trae las cuentas de ahorro del cliente en ODS--------------------------------------
    this.recobrosService.findCuentasAhorroCliente(this.tipoIdent, this.numeroDocumentoC, this.digitoTipoN).subscribe(data => {
      for(var _i=0 ; _i<data.length; _i++){
        this.cuentasAhorroCliente.push((data[_i]));
        this.cuentasAhorro.push((data[_i])[0]);   
        for(let tipoProducto of this.tipoProductos){
          if(tipoProducto.codigo== data[_i][6] && tipoProducto.tipo== "AH"){
            this.cuentasAhorroTipo=[ ...this.cuentasAhorroTipo, { numero: data[_i][0], 
              tipo: "AH", codigo: data[_i][6], nombre: tipoProducto.nombre}  
              ];
          }
        }         
      }
      Array.prototype.push.apply(this.cuentasA, this.cuentasAhorroTipo);
      console.log("Cuentas de ahorro del cliente:");
      console.log(this.cuentasAhorroTipo);
      console.log("Total cuentas del cliente:");
      console.log(this.cuentasA);

      setTimeout(() => {//Espera 3 segundos mientras trae las cuentas de ahorro de ODS
        //--------------------------------------Trae las cuentas corrientes del cliente en ODS--------------------------------------
        this.recobrosService.findCuentasCorrienteCliente(this.tipoIdent, this.numeroDocumentoC, this.digitoTipoN).subscribe(data1 => { 
          if(this.tipoIdent== 'N'){
            this.numeroDocumentoC= this.numeroDocumentoCA;            
          }
          for(var _i=0 ; _i<data1.length; _i++){
            this.cuentasCorrienteCliente.push((data1[_i]));
            this.cuentasCorriente.push((data1[_i])[0]);   
            for(let tipoProducto of this.tipoProductos){
              if(tipoProducto.codigo== data1[_i][6] && tipoProducto.tipo== "CC"){
                this.cuentasCorrienteTipo=[ ...this.cuentasCorrienteTipo, { numero: data1[_i][0], 
                  tipo: "CC", codigo: data1[_i][6], nombre: tipoProducto.nombre}  
                  ];
              }
            }         
          }
          Array.prototype.push.apply(this.cuentasA, this.cuentasCorrienteTipo);
          console.log("Cuentas de corrientes del cliente:");
          console.log(this.cuentasCorrienteTipo);
          console.log("Total cuentas del cliente:");
          console.log(this.cuentasA);  
          
          setTimeout(()=>{
            if(this.cuentasA.length==0){
              this.alertService.warning("El usuario no tiene cuentas con el Banco de Bogotá");
              this.spinner.hide();
            }else{
              //Validar las excepciones por cuenta
              console.log("Se validarán las excepciones por cuenta: ");
              for(let cuentaA of this.cuentasA){
                this.bandera=0;
                for(let datoPC of this.datosPC){
                  if(cuentaA.numero== datoPC.numeroCuenta && cuentaA.tipo== datoPC.tipo && datoPC.estado=="ACTIVO"){ 
                    this.bandera=1;
                    console.log("Cuenta "+cuentaA.numero+" está excepcionada");
                    break;
                  }
                }
                if(this.bandera==0){
                  this.cuentasAA=[ ...this.cuentasAA, { numero: cuentaA.numero, 
                    tipo: cuentaA.tipo,
                    codigo: cuentaA.codigo, nombre: cuentaA.nombre}  
                  ];
                }      
              }
              if(this.cuentasAA.length< this.cuentasA.length){          
                if(this.cuentasAA.length==0){
                  this.alertService.warning("Se excluyeron cuentas excepcionadas, no quedaron cuentas aptas");
                  console.log("No quedaron cuentas aptas");
                }else{
                  console.log("Se excluyeron cuentas excepcionadas por cuenta, quedan "+this.cuentasAA.length+" habilitadas");
                  //this.alertService.warning("Se excluyeron cuentas excepcionadas por cuenta, quedan "+this.cuentasAA.length+" habilitadas");
                }
              }          
              console.log("Total cuentas del cliente:");
              console.log(this.cuentasAA);
              console.log("Se validarán las excepciones por tipo producto: ");
              //Validar las excepciones por tipo producto
              for(let cuentaAA of this.cuentasAA){
                this.bandera=0;
                for(let datoPEP of this.datosPEP){
                  if(cuentaAA.codigo== datoPEP.codigoProducto && cuentaAA.tipo== datoPEP.tipoProducto && datoPEP.estado=="ACTIVO"){ 
                    this.bandera=1;
                    console.log("Cuenta "+cuentaAA.numero+" está excepcionada por tipo:"+cuentaAA.codigo+' - '+cuentaAA.tipo);
                    break;
                  }
                }
                if(this.bandera==0){
                  this.cuentas=[ ...this.cuentas, { numero: cuentaAA.numero, 
                    tipo: cuentaAA.tipo,
                    codigo: cuentaAA.codigo, nombre: cuentaAA.nombre}  
                  ];
                }      
              }
              if(this.cuentas.length< this.cuentasAA.length){          
                if(this.cuentas.length==0){
                  console.log("No quedaron cuentas aptas");
                  this.alertService.warning("Se excluyeron cuentas excepcionadas, no quedaron cuentas aptas");
                }else{
                  console.log("Se excluyeron cuentas excepcionadas por cuenta o tipo producto, quedan "+this.cuentas.length+" habilitadas");
                  this.alertService.warning("Se excluyeron cuentas excepcionadas por cuenta o tipo de producto, quedan "+this.cuentas.length+" habilitadas");
                }
              }
              console.log("Total cuentas del cliente:");
              console.log(this.cuentas);
              this.spinner.hide();
              this.alertService.success("Se han cargado las cuentas del usuario"); 
              /*this.recobrosService.SaveRecCuentas(this.cuentas).subscribe(data => {    
              }, error => { 
                this.alertService.warning("Error: "+error);
              });           */
            }                 
          },2500);
        }, error => { 
          this.alertService.warning("No se pudieron cargar las cuentas del cliente: "+error);
          this.spinner.hide();
        });
      }, 2500);
    }, error => { 
      this.alertService.warning("No se pudieron cargar las cuentas del cliente: "+error);
    });   
  }

  editarRegistro(row){   
    this.spinner.show();
    this.headerModal="Editar configuración de cliente especial";
    this.numeroDocumento= row.numDocumento;
    this.tipoIdent= row.tipoDocumento;
    this.nombreUsuario= row.nombreClienteEspecial;
    //(<HTMLInputElement>document.getElementById("codigoTransaccionE")).value="";
    this.selectedCodTransaccion="";
    this.cuentas=[];
    this.cuentasTipo=[];
    this.cuentasTipoA=[];
    this.cuentasTipoAA=[];
    this.toppingsCuentas = new FormControl(); 
    this.toppingsCuentas.setValue([]);
    this.toppingsCuentasAux = new FormControl(); 
    this.toppingsCuentasAux.setValue([]);
    
    this.recobrosService.findClienteEspecialesTransaccionesConf(this.numeroDocumento, this.tipoIdent).subscribe(data => {      
      this.clienteEspecialTransacciones= data; 
      this.clienteEspecialTransaccionesL = data.length;   
    }, error => { 
      this.alertService.warning("No se pudo cargar las transacciones configuradas para el cliente: "+error);
    });

    for(let usuario of this.options){      
      if(usuario.identificacion == row.numDocumento){
        this.identificacionUsuario= row.numDocumento;
        this.nombreUsuario= usuario.nombre;
        this.tipoIdent= usuario.tipoId;
        this.idClienteRec= usuario.idClienteRec;
        break;
      }
    }      

    this.recobrosService.findClienteCuentas(this.idClienteRec).subscribe(data => {  
      for(var _i=0 ; _i<data.length; _i++){
        this.cuentas.push((data[_i])[0]);
        for(let tipoProducto of this.tipoProductos){
          if(tipoProducto.codigo== data[_i][2] && tipoProducto.tipo== data[_i][1]){
            this.cuentasTipoA=[ ...this.cuentasTipoA, { numero: data[_i][0], 
              tipo: data[_i][1], codigo: data[_i][2], nombre: tipoProducto.nombre}  
              ];
          }
        }
      }
      console.log("Total cuentas del cliente:");
      console.log(this.cuentasTipoA);  
      console.log("Se validarán las excepciones por cuenta: ");
      for(let cuentaA of this.cuentasTipoA){
        this.bandera=0;
        for(let datoPC of this.datosPC){
          if(cuentaA.numero== datoPC.numeroCuenta && cuentaA.tipo== datoPC.tipo && datoPC.estado=="ACTIVO"){ 
            this.bandera=1;
            console.log("Cuenta "+cuentaA.numero+" está excepcionada");
            break;
          }
        }
        if(this.bandera==0){
          this.cuentasTipoAA=[ ...this.cuentasTipoAA, { numero: cuentaA.numero, 
            tipo: cuentaA.tipo,
            codigo: cuentaA.codigo, nombre: cuentaA.nombre}  
          ];
        }      
      }
      if(this.cuentasTipoAA.length< this.cuentasTipoA.length){          
        if(this.cuentasTipoA.length==0){
          this.alertService.warning("Se excluyeron cuentas excepcionadas, no quedaron cuentas aptas");
          console.log("No quedaron cuentas aptas");
        }else{
          console.log("Se excluyeron cuentas excepcionadas por cuenta, quedan "+this.cuentasTipoAA.length+" habilitadas");
          //this.alertService.warning("Se excluyeron cuentas excepcionadas por cuenta, quedan "+this.cuentasAA.length+" habilitadas");
        }
      }          
      console.log("Total cuentas del cliente:");
      console.log(this.cuentasTipoAA);
      console.log("Se validarán las excepciones por tipo producto: ");
      console.log(this.datosPEP);
      //Validar las excepciones por tipo producto
      for(let cuentaAA of this.cuentasTipoAA){
        this.bandera=0;
        for(let datoPEP of this.datosPEP){
          if(cuentaAA.codigo== datoPEP.codigoProducto && cuentaAA.tipo== datoPEP.tipoProducto && datoPEP.estado=="ACTIVO"){ 
            this.bandera=1;
            console.log("Cuenta "+cuentaAA.numero+" está excepcionada por tipo:"+cuentaAA.codigo+' - '+cuentaAA.tipo);
            break;
          }
        }
        if(this.bandera==0){
          this.cuentasTipo=[ ...this.cuentasTipo, { numero: cuentaAA.numero, 
            tipo: cuentaAA.tipo,
            codigo: cuentaAA.codigo, nombre: cuentaAA.nombre}  
          ];
        }      
      }
      if(this.cuentasTipo.length< this.cuentasTipoAA.length){          
        if(this.cuentasTipo.length==0){
          console.log("No quedaron cuentas aptas");
          this.alertService.warning("Se excluyeron cuentas excepcionadas, no quedaron cuentas aptas");
        }else{
          console.log("Se excluyeron cuentas excepcionadas por cuenta o tipo producto, quedan "+this.cuentasTipo.length+" habilitadas");
          this.alertService.warning("Se excluyeron cuentas excepcionadas por cuenta o tipo de producto, quedan "+this.cuentasTipo.length+" habilitadas");
        }
      }
      console.log("Total cuentas del cliente:");
      console.log(this.cuentasTipo);
      this.cuentasTipo= this.cuentasTipo;
      this.spinner.hide();
    }, error => { 
      this.spinner.hide();
      this.alertService.warning("No se pudieron cargar las cuentas del cliente: "+error);
    });    

    this.codigoTransaccionControlEditar = new FormControl('', [Validators.required,]);
    this.numeroDocumentoControlEditar.setErrors({'required': false});
    this.cuentasCobrarControlEditar.setErrors({'required': false});
  }

  eliminarRegistro(row){
    this.headerModal="Eliminar cliente especial";
    this.identificacionUsuario=row.numDocumento;
  } 

  verRegistro(row){
    this.headerModal="Detalles cliente especial "+row.nombreClienteEspecial;
    this.identificacionUsuario=row.numDocumento;
    this.tipoIdent= row.tipoDocumento;
    this.selectedCodTransaccion="";
    this.codigoTransaccionControlVer = new FormControl('', [Validators.required,]);
    this.recobrosService.findClienteEspecialesTransaccionesConf(this.identificacionUsuario, this.tipoIdent).subscribe(data => {      
      this.clienteEspecialTransacciones= data;          
    }, error => { 
      this.alertService.warning("No se pudo cargar las transacciones configuradas para el cliente: "+error);
    });
  }

  filtrarTabla(){
    //-------------Actualiza el tiempo de timeOut (milisegundos) de la sesión--------------------//
    this.authService.actualizarSesion(this.global.timeOut);
    //-------------------------------------------------------------------------------------------// 
    this.spinner.show();
    this.dataSource = new ListaclientesespecialesDataSource(); 
    this.recobrosService.findRecClientes().subscribe(data => {
      this.datosP=[];
      this.dataSource.data=this.datosP; 
      for(var _i=0 ; _i<data.length; _i++){
        this.options=[ ...this.options, { idClienteRec: data[_i]["idClienteRec"], identificacion: data[_i]["numIdent"], 
        nombre: data[_i]["nombre"], tipoId: data[_i]["tipoIdent"] }  
        ];
      }
      this.recobrosService.findRecClientesEspecialesD().subscribe(data1 => {  
        for(var _i=0 ; _i<data1.length; _i++){
          this.nombreClienteEspecial="No registrado en recobros";          
          for(let usuario of data){      
            if(usuario.numIdent == (data1[_i])[0]){
              this.nombreClienteEspecial= usuario.nombre;
              break;
            }
          }
          this.datosP= [ ...this.datosP, { tipoDocumento: (data1[_i])[1], 
                            numDocumento: (data1[_i])[0] , nombreClienteEspecial: this.nombreClienteEspecial
                          }  
          ]; 
        }
        this.dataSource.data=  this.datosP;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.spinner.hide(); 
      }, error => { 
        this.alertService.warning("No se pudo cargar la información de los clientes especiales: "+error);
        this.dataSource.data= [];
        this.spinner.hide(); 
      });
    }, error => { 
      this.alertService.warning("No se pudo cargar la información de los clientes de recobros: "+error);
    });     
  }

  

  operacionRegistro(opcion: number){
    this.spinner.show();    
    if(opcion==1){ //Editar                   
      //Elimina la configuración del cliente especial         
      this.recobrosService.DeleteClienteEspecial(this.tipoIdent, this.numeroDocumento, this.selectedCodTransaccion).subscribe(data => {  
        if(data==null){
          this.alertService.danger("Falló la conexión con el origen de datos.");
        }else{
          if(data["exitoso"]!==undefined){             
          }else if(data["warning"]!==undefined){
            this.alertService.success(data["warning"]);
          }
          else{
            this.alertService.danger(data["error"]);
          }
        }           
      }, error => { 
        this.alertService.warning("Error mientras se actualizaba "+this.numeroDocumento +": "+error);
      });

      setTimeout(() => {// Espero tres segundos a que elimine la configuración
        if(this.toppingsCuentas.value.length>0){//-----------------------Agrego las nuevas cuentas al cliente especial---------------------
          for(let cuenta of this.toppingsCuentas.value){
            for(let cuentaTipo of this.cuentasTipo){              
              if(cuenta== cuentaTipo.numero){
                this.tipoCuenta= cuentaTipo.tipo;
                break;
              }
            }            
            this.recobrosService.SaveClienteEspecial(this.numeroDocumento, this.tipoIdent, this.selectedCodTransaccion, '00', cuenta, this.tipoCuenta).subscribe(data => {       
              if(data==null){
                this.alertService.danger("Falló la conexión con el origen de datos.");
              }else{
                if(data["exitoso"]!==undefined){
                  this.recobrosService.saveLog('Configuración -> Clientes especiales', this.global.detalles_clientes_especiales[1] +this.identificacionUsuario+" con la transacción "+this.selectedCodTransaccion+" para la cuenta "+ cuenta,this.global.login, 'Guardar').subscribe(data => {});
                  this.filtrarTabla();
                  //this.alertService.success("Configuró la cuenta: "+cuenta+ " para el cliente: "+this.numeroDocumento+" transacción: "+this.selectedCodTransaccion);
                }else{
                  this.alertService.danger(data["error"]);
                }
              }               
            }, error => { 
              this.alertService.warning("No se pudo editar el cliente especial: "+this.identificacionUsuario+"para la cuenta "+ cuenta+": "+error);
              this.spinner.hide();
            });
          }
          /*this.filtrarTabla();
          this.alertService.success("Configuró con exito el cliente: "+this.identificacionUsuario);  */     
        }else{
          this.filtrarTabla();
        }          
      }, 3000);

    }else if(opcion==2){ //Eliminar
      this.recobrosService.DeleteClienteEspecialTodo(this.identificacionUsuario).subscribe(data => { 
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
      }, error => { 
        this.alertService.warning("Error mientras se actualizaban las cuentas de "+this.identificacionUsuario +": "+error);
      });
    }else if(opcion==3){ //Guardar    
      console.log("-------------------------Entró a guardar el cliente especial-------------------------");
      //Elimina la configuración del cliente especial         
      this.recobrosService.DeleteClienteEspecial(this.tipoIdent, this.numeroDocumentoC, this.selectedCodTransaccion).subscribe(data => {    
        if(data==null){
          this.alertService.danger("Falló la conexión con el origen de datos.");
        }else{
          if(data["exitoso"]!==undefined){
            console.log("Se eliminó el cliente especial: "+data["exitoso"]);
          }else{
            console.log("No se pudo eliminar el cliente especial: "+data["error"]);            
          }
        } 
      }, error => { 
        this.alertService.warning("Error mientras se actualizaba "+this.identificacionUsuario +": "+error);
      });

      setTimeout(() => { // Espera 3 segundos mientras se borra la configuración del cliente especial
        console.log("----3 segundos-----");
        if(this.toppingsCuentas.value.length>0){//Si se seleccionaron cuentas, haga:  
          console.log("Se seleccionaron cuentas: ");  
          console.log(this.toppingsCuentas.value);  
          console.log("Guardará el cliente: "+ this.nombreUsuario+": "+this.numeroDocumentoC+" - "+this.tipoIdent+" seg: "+this.segmentoRecCliente);
          //Crea el cliente en recCliente
          this.recobrosService.SaveRecCliente(this.nombreUsuario, this.tipoIdent, this.numeroDocumentoC, this.segmentoRecCliente, '1').subscribe(data => {       
            if(data==null){
              this.alertService.danger("Falló la conexión con el origen de datos.");
            }else{
              if(data["exitoso"]!==undefined){
                console.log("Se guardó el cliente: "+data["exitoso"]);                
              }else{
                console.log("No se pudo guardar el cliente razón: "+data["error"]);
              }
            }                        
          }, error => { 
            this.alertService.warning("No se pudo guardar el cliente en recobros: "+error);
          });

          setTimeout(()=>{// Espera 3 segundos mientras guarda el cliente            
            // Busca el idCliente del cliente en recCliente
            this.recobrosService.findRecCliente(this.tipoIdent, this.numeroDocumentoC).subscribe(data=> {
              this.idClienteRec=(data[0])["idClienteRec"];  
              console.log("Id del cliente:" +this.idClienteRec);       
            }, error =>{
              console.log("No se pudo encontrar el cliente en recobros, razón: "+error);
              this.alertService.warning("No se pudo encontrar el cliente en recobros");
              this.spinner.hide();
            }); 

            setTimeout(() => {// Espera 3 segundo mientras trae el idCliente
              console.log("Empezará a crear las cuentas");
              // Valida si son mas de 200 cuentas, para informar y actualizar el tiempo de espera.
              this.numeroDeCuentas= this.cuentasAhorroCliente.length+this.cuentasCorrienteCliente.length;
              if((this.numeroDeCuentas+1)>200){
                //-------------Actualiza el tiempo dependendiendo del número de cuentas--------------------//
                this.authService.actualizarSesion((this.numeroDeCuentas+1200)*1000);
                //-------------------------------------------------------------------------------------------//   
                this.alertService.info("El cliente tiene "+this.numeroDeCuentas+' cuentas, tardará '+(this.numeroDeCuentas*1)/60 +' minutos aproximadamente.');
              }
              
              // Guarda las cuentas (AH y CC) de los clientes de ODS en recCuentas             
              
              //-----AH--------//
              console.log("Creará las cuentas de ahorro:");
              console.log(this.cuentasAhorroCliente);
              for(let cuenta of this.cuentasAhorroCliente){    
                  if(cuenta[5]==null){// Si la titularidad es vacía desde ODS, hagala igual a 1
                    cuenta[5]=1;
                  }        
                  this.recobrosService.SaveRecCuenta('AH', cuenta[0], this.idClienteRec, cuenta[1], cuenta[2], cuenta[3], cuenta[4], 
                    '0', cuenta[3], '0', '0', '0', '0', cuenta[5], cuenta[6], '', cuenta[7], '', '', '', '', '', '0').subscribe(data => {
                    if(data==null){
                      this.alertService.danger("Falló la conexión con el origen de datos.");
                    }else{
                      if(data["exitoso"]!==undefined){
                        console.log("Pudo guardar la cuenta: "+cuenta[0]+" razón: "+data["exitoso"]);
                      }else{
                        console.log("No se pudo guardar la cuenta: "+cuenta[0]+" razón: "+data["error"]);
                      }
                    }                              
                    },  error => { 
                    console.log("No se pudo guardar la cuenta: "+ cuenta[0] +" razón: "+error);
                    //this.alertService.danger("No se pudo guardar la cuenta: "+ error);
                  });                                
              }    

              //-----CC------//
              console.log("Creará las cuentas corrientes:");
              console.log(this.cuentasCorrienteCliente);
              for(let cuenta of this.cuentasCorrienteCliente){  
                  if(cuenta[5]==null){// Si la titularidad es vacía desde ODS, hagala igual a 1
                  cuenta[5]=1;
                }  
                this.recobrosService.SaveRecCuenta('CC', cuenta[0], this.idClienteRec, cuenta[1], cuenta[2], cuenta[3], cuenta[4], 
                  '0', cuenta[3], '0', '0', '0', '0', cuenta[5], cuenta[6], '', cuenta[7], '', '', '', '', '', '0').subscribe(data => {   
                  if(data==null){
                    this.alertService.danger("Falló la conexión con el origen de datos.");
                  }else{
                    if(data["exitoso"]!==undefined){
                      console.log("Pudo guardar la cuenta: "+cuenta[0]+" razón: "+data["exitoso"]);
                    }else{
                      console.log("No se pudo guardar la cuenta: "+cuenta[0]+" razón: "+data["error"]);
                    }
                  }               
                  },  error => { 
                  console.log("No se pudo guardar la cuenta: "+ cuenta[0] +" razón: "+error);
                  //this.alertService.danger("No se pudo guardar la cuenta: "+ error);
                });                                     
              }

              setTimeout(()=>{ //Espera mientras se crean las cuentas      
                console.log("Empezará a crear el cliente especial "+this.numeroDocumentoC+ " - "+this.tipoIdent+ " con la tx "+ this.selectedCodTransaccion+" y las cuentas:");     
                console.log(this.toppingsCuentas.value);
                //----Crea los clientes especiales-----//
                for(let cuenta of this.toppingsCuentas.value){
                  for(let cuentaAux of this.cuentasAhorroCliente){
                    if(cuentaAux[0]==cuenta){this.tipoCuenta="AH";break;}
                  }
                  for(let cuentaAux of this.cuentasCorrienteCliente){
                    if(cuentaAux[0]==cuenta){this.tipoCuenta="CC";break;}
                  }
    
                  this.recobrosService.SaveClienteEspecial(this.numeroDocumentoC, this.tipoIdent, this.selectedCodTransaccion, '00', cuenta, this.tipoCuenta).subscribe(data => {       
                    if(data==null){
                      this.alertService.danger("Falló la conexión con el origen de datos.");
                    }else{
                      if(data["exitoso"]!==undefined){                        
                        this.recobrosService.saveLog('Configuración -> Clientes especiales ', this.global.detalles_clientes_especiales[0] +this.identificacionUsuario+" con la transacción "+this.selectedCodTransaccion+" para la cuenta "+ cuenta,this.global.login, 'Guardar').subscribe(data => {});
                        this.filtrarTabla();
                        console.log("Configuró la cuenta: "+cuenta+ " para el cliente: "+this.numeroDocumentoC+" transacción: "+this.selectedCodTransaccion);
                      }else{
                        console.log("No se pudo guardar el cliente especial de la cuenta: "+cuenta+ " para el cliente: "+this.numeroDocumentoC+" transacción: "+this.selectedCodTransaccion+" razón: "+data["error"]);
                        //this.spinner.hide();
                      }
                    }                   
                  }, error => { 
                    this.alertService.warning("No se pudo guardar el cliente especial: "+this.identificacionUsuario+"para la cuenta "+ cuenta+": "+error+". Intentelo de nuevo.");
                    this.spinner.hide();
                  });
                }
                /*this.filtrarTabla();
                this.alertService.success("Configuró con exito el cliente: "+this.identificacionUsuario);*/
              },(this.cuentasAhorroCliente.length+this.cuentasCorrienteCliente.length+1)*1600);//Espera de crear cuentas
            },3000);
          },3000);        
        }else{
          this.filtrarTabla();
        }
      },3000);       
    }  
  }
}
