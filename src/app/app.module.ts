import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTabsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatCardModule, MatAutocompleteModule, MatPaginatorIntl } from '@angular/material';
import { GestorMenuComponent } from './menu/gestor-menu/gestor-menu.component';
import { ConfiguracionesComponent } from './menu/configuraciones/configuraciones.component';
import { HerramientasComponent } from './menu/herramientas/herramientas.component';
import { AdministracionComponent } from './menu/administracion/administracion.component';
import { ConsultasComponent } from './menu/consultas/consultas.component';
import { ExcepcionesComponent } from './menu/configuraciones//excepciones/excepciones.component';
import { ParametrosComponent } from './menu/configuraciones//parametros/parametros.component';
import { ArqueoComponent } from './menu/herramientas/arqueo/arqueo.component';
import { LogsComponent } from './menu/administracion/logs/logs.component';
import { NotificacionesComponent } from './menu/administracion/notificaciones/notificaciones.component';
import { UsuariosComponent } from './menu/administracion/usuarios/usuarios.component';
import { GeneralComponent } from './menu/consultas/general/general.component';
import { PendientesComponent } from './menu/consultas/pendientes/pendientes.component';
import { ExitososComponent } from './menu/consultas/exitosos/exitosos.component';
import { NocobrablesComponent } from './menu/consultas/nocobrables/nocobrables.component';
import { ExcepcionadosComponent } from './menu/consultas/excepcionados/excepcionados.component';
import { HomeComponent } from './menu/home/home.component';
import { ListamenuComponent } from './menu/gestor-menu/listamenu/listamenu.component';
import { ListarolComponent } from './menu/gestor-menu/listarol/listarol.component';
import { ClienteComponent } from './menu/configuraciones/excepciones/cliente/cliente.component';
import { CuentaComponent } from './menu/configuraciones/excepciones/cuenta/cuenta.component';
import { TipoproductoComponent } from './menu/configuraciones/excepciones/tipoproducto/tipoproducto.component';
import { TransaccionComponent } from './menu/configuraciones/excepciones/transaccion/transaccion.component';
import { ReglaComponent } from './menu/configuraciones/parametros/regla/regla.component';
import { ListaarqueoComponent } from './menu/herramientas/arqueo/listaarqueo/listaarqueo.component';
import { ListausuariosComponent } from './menu/administracion/usuarios/listausuarios/listausuarios.component';
import { ListanotificacionesComponent } from './menu/administracion/notificaciones/listanotificaciones/listanotificaciones.component';
import { ListalogsComponent } from './menu/administracion/logs/listalogs/listalogs.component';
import { ReportegeneralComponent } from './menu/consultas/general/reportegeneral/reportegeneral.component';
import { GraficaComponent } from './menu/consultas/general/grafica/grafica.component';
import { recobrosServices } from './service/recobro.service';
import { HttpModule } from '@angular/http';
import { MatFileUploadModule } from 'mat-file-upload';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ListapendientesComponent } from './menu/consultas/pendientes/listapendientes/listapendientes.component';
import { ListaexitososComponent } from './menu/consultas/exitosos/listaexitosos/listaexitosos.component';
import { ListanocobrablesComponent } from './menu/consultas/nocobrables/listanocobrables/listanocobrables.component';
import { ListaexcepcionadosComponent } from './menu/consultas/excepcionados/listaexcepcionados/listaexcepcionados.component';
import { TransaccionesComponent } from './menu/consultas/transacciones/transacciones.component';
import { ListatransaccionesComponent } from './menu/consultas/transacciones/listatransacciones/listatransacciones.component';
import { ListaclientesexcepcionadosComponent } from './menu/consultas/excepcionados/listaclientesexcepcionados/listaclientesexcepcionados.component';
import { ListacuentasexcepcionadasComponent } from './menu/consultas/excepcionados/listacuentasexcepcionadas/listacuentasexcepcionadas.component';
import { ListatransaccionesexcepcionadasComponent } from './menu/consultas/excepcionados/listatransaccionesexcepcionadas/listatransaccionesexcepcionadas.component';
import { MessageServiceComponent } from './message-service/message-service.service';
import { AlertModule } from 'ngx-alerts';
import {ReactiveFormsModule} from '@angular/forms';
import { map } from 'rxjs/operators';
import { Global } from './global';
import { AuthGuard } from './auth.guard';
import { getDutchPaginatorIntl } from './dutch-paginator-intl';
import { ClientesespecialesComponent } from './menu/configuraciones/clientesespeciales/clientesespeciales.component';
import { ListaclientesespecialesComponent } from './menu/configuraciones/clientesespeciales/listaclientesespeciales/listaclientesespeciales.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NumberDirective } from './numbers-only.directive';
import { InformesComponent } from './menu/informes/informes.component';
import { IgeneralComponent } from './menu/informes/igeneral/igeneral.component';
import { RegistroscargadosComponent } from './menu/informes/igeneral/registroscargados/registroscargados.component';
import { DeudascreadasComponent } from './menu/informes/igeneral/deudascreadas/deudascreadas.component';
import { CobrosComponent } from './menu/informes/igeneral/cobros/cobros.component';
import { IpendientesComponent } from './menu/informes/igeneral/ipendientes/ipendientes.component';
import { IgeneralmesComponent } from './menu/informes/igeneralmes/igeneralmes.component';
import { RegistroscargadosmesComponent } from './menu/informes/igeneralmes/registroscargadosmes/registroscargadosmes.component';
import { DeudascreadasmesComponent } from './menu/informes/igeneralmes/deudascreadasmes/deudascreadasmes.component';
import { CobrosmesComponent } from './menu/informes/igeneralmes/cobrosmes/cobrosmes.component';
import { IpendientesmesComponent } from './menu/informes/igeneralmes/ipendientesmes/ipendientesmes.component';
import { IcargadostxComponent } from './menu/informes/icargadostx/icargadostx.component';
import { ListaicargadostxComponent } from './menu/informes/icargadostx/listaicargadostx/listaicargadostx.component';
import { RegiscarvsdeucreComponent } from './menu/informes/regiscarvsdeucre/regiscarvsdeucre.component';
import { ListaregiscarComponent } from './menu/informes/regiscarvsdeucre/listaregiscar/listaregiscar.component';
import { ListadeucreComponent } from './menu/informes/regiscarvsdeucre/listadeucre/listadeucre.component';
import { RegisrechvsfeccargComponent } from './menu/informes/regisrechvsfeccarg/regisrechvsfeccarg.component';
import { ListregisrechvsfeccargComponent } from './menu/informes/regisrechvsfeccarg/listregisrechvsfeccarg/listregisrechvsfeccarg.component';
import { RechazadosvscobrosComponent } from './menu/informes/rechazadosvscobros/rechazadosvscobros.component';
import { ListarechazadosvscobrosComponent } from './menu/informes/rechazadosvscobros/listarechazadosvscobros/listarechazadosvscobros.component';
import { DeudasvscobrosComponent } from './menu/informes/deudasvscobros/deudasvscobros.component';
import { IrrecudiarioComponent } from './menu/informes/irrecudiario/irrecudiario.component';
import { DeudasComponent } from './menu/informes/deudas/deudas.component';
import { IncobrablesComponent } from './menu/informes/incobrables/incobrables.component';
import { IexcepcionadosComponent } from './menu/informes/iexcepcionados/iexcepcionados.component';
import { ListacobrosComponent } from './menu/informes/deudasvscobros/listacobros/listacobros.component';
import { ListadeudasComponent } from './menu/informes/deudasvscobros/listadeudas/listadeudas.component';
import { IcobrosComponent } from './menu/informes/icobros/icobros.component';
import { IdeudasexcComponent } from './menu/informes/ideudasexc/ideudasexc.component';
import { ExccuentaComponent } from './menu/informes/ideudasexc/exccuenta/exccuenta.component';
import { ExcclienteComponent } from './menu/informes/ideudasexc/exccliente/exccliente.component';
import { ExcproductoComponent } from './menu/informes/ideudasexc/excproducto/excproducto.component';
import { IdeudasincComponent } from './menu/informes/ideudasinc/ideudasinc.component';
import { ListaideudasincComponent } from './menu/informes/ideudasinc/listaideudasinc/listaideudasinc.component';
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser';
import { IdescargablependientesComponent } from './menu/informes/idescargablependientes/idescargablependientes.component';
import { ListaarqueogeneralComponent } from './menu/herramientas/arqueo/listaarqueogeneral/listaarqueogeneral.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
   // { path: 'login', component: LoginComponent },
    { path: 'menu', component: MenuComponent, canActivate: [AuthGuard],
      children:[
        { path:'', component: HomeComponent },
        { path:'home', component: HomeComponent },
        { path:'Gestor de menús', component: GestorMenuComponent},
        { path:'Gestor de menus', component: GestorMenuComponent},
        { path:'Informes', component: InformesComponent},
        { path:'Informe general', component: IgeneralComponent},
        { path:'Informe mes', component: IgeneralmesComponent},
        { path:'D. excepcionadas', component: IdeudasexcComponent},
        { path:'D. incobrables', component: IdeudasincComponent},
        { path:'Cargados TX', component: IcargadostxComponent},
        { path:'CargadosVSDeudas', component: RegiscarvsdeucreComponent},
        { path:'RechazosVSFcargue', component: RegisrechvsfeccargComponent},
        { path:'RechazosVSCobros', component: RechazadosvscobrosComponent},
        { path:'DeudasVSCobros', component: DeudasvscobrosComponent},
        { path:'Irrecudiario', component: IrrecudiarioComponent},
        { path:'Deudas', component: DeudasComponent},
        { path:'I. Pendientes', component: IdescargablependientesComponent},
        { path:'Cobros', component: IcobrosComponent},
        { path:'I. Incobrables', component: IncobrablesComponent},
        { path:'I. Excepcionados', component: IexcepcionadosComponent},
        { path:'Excepciones', component: ExcepcionesComponent},
        { path:'Parámetros App', component: ParametrosComponent},
        { path:'Parametros App', component: ParametrosComponent},
        //{ path:'Clientes especiales', component: ClientesespecialesComponent},
        //{ path:'Clientes Especiales', component: ClientesespecialesComponent},
        { path:'Arqueo', component: ArqueoComponent},
        { path:'Notificaciones', component: NotificacionesComponent},
        { path:'Logs', component: LogsComponent},
        { path:'Usuarios', component: UsuariosComponent},
        { path:'Consultas', component: ConsultasComponent},
        { path:'General', component: GeneralComponent},
        { path:'Pendientes', component: PendientesComponent},
        { path:'Exitosos', component: ExitososComponent},
        { path:'Incobrables', component: NocobrablesComponent},
        { path:'Excepcionados', component: ExcepcionadosComponent},  
        { path:'Transacciones', component: TransaccionesComponent}, 
        { path: '**', component: HomeComponent },     
    ]
  },
  { path: '**', component: LoginComponent },    
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    LoginComponent,
    MenuComponent,
    GestorMenuComponent,
    ConfiguracionesComponent,
    HerramientasComponent,
    AdministracionComponent,
    ConsultasComponent,
    ExcepcionesComponent,
    ParametrosComponent,
    ArqueoComponent,
    LogsComponent,
    NotificacionesComponent,
    UsuariosComponent,
    GeneralComponent,
    PendientesComponent,
    ExitososComponent,
    NocobrablesComponent,
    ExcepcionadosComponent,
    HomeComponent,
    ListamenuComponent,
    ListarolComponent,
    ClienteComponent,
    CuentaComponent,
    TipoproductoComponent,
    TransaccionComponent,
    ReglaComponent,
    ListaarqueoComponent,
    ListausuariosComponent,
    ListanotificacionesComponent,
    ListalogsComponent,
    ReportegeneralComponent,
    GraficaComponent,
    ListapendientesComponent,
    ListaexitososComponent,
    ListanocobrablesComponent,
    ListaexcepcionadosComponent,
    TransaccionesComponent,
    ListatransaccionesComponent,
    ListaclientesexcepcionadosComponent,
    ListacuentasexcepcionadasComponent,
    ListatransaccionesexcepcionadasComponent,
    ClientesespecialesComponent,
    ListaclientesespecialesComponent, ExccuentaComponent, ExcclienteComponent, ExcproductoComponent,
    NumberDirective, IcobrosComponent, IdeudasexcComponent, RegiscarvsdeucreComponent, ListacobrosComponent, ListadeudasComponent, IcargadostxComponent, IgeneralmesComponent, InformesComponent, IgeneralComponent, RegistroscargadosComponent, DeudascreadasComponent, CobrosComponent, IpendientesComponent, IgeneralmesComponent, RegistroscargadosmesComponent, DeudascreadasmesComponent, CobrosmesComponent, IpendientesmesComponent, ListaicargadostxComponent, ListaregiscarComponent, ListadeucreComponent, RegisrechvsfeccargComponent, ListregisrechvsfeccargComponent, RechazadosvscobrosComponent, ListarechazadosvscobrosComponent, DeudasvscobrosComponent, IrrecudiarioComponent, DeudasComponent, IncobrablesComponent, IexcepcionadosComponent, IdeudasincComponent, ListaideudasincComponent, IdescargablependientesComponent, ListaarqueogeneralComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    ChartsModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 4000, position: 'right'}),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatCardModule,
    MatAutocompleteModule,
    //MatFileUploadModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFileUploadModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
  ],
  exports:[    
    BrowserAnimationsModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
  ],
  providers: [ { provide: LocationStrategy, useClass: HashLocationStrategy },recobrosServices, MatDatepickerModule, MessageServiceComponent,GraficaComponent, Global, AuthGuard, { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }],
  bootstrap: [AppComponent]
})
export class AppModule { }
