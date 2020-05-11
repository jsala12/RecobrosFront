import { Injectable } from '@angular/core';
import { ILogin } from './login';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  myTimeOut;
  myTimeOutAux;

  constructor(public authService: AuthService, private global: Global, private router : Router, private alertService: AlertService, private spinner: NgxSpinnerService) { }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
  } 

  actualizarSesion(timeOut: number){
    clearTimeout(this.myTimeOut);
    clearTimeout(this.myTimeOutAux);
    //-----Esto envía un alert para indícar que la sesión está proxima a cadudar-------//
    this.myTimeOutAux= setTimeout(() => {
      this.alertService.warning("La sesión esta a punto de caducar por inactividad");     
    }, timeOut-10000);
    //--------------------Inicia el timeOut para la sesión-----------------------------//
    this.myTimeOut= setTimeout(() => { // Lo que está aquí se ejecutará cuando se acabe el "timeOut".
      this.alertService.warning("La sesión ha caducado por inactividad");
      this.router.navigate(['']);//Redirecciona a la pantalla de "login", dónde se muere la sesión.      
    }, timeOut); 
    //--------------------------------------------------------------------------------//
  }

}