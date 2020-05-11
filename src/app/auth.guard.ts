import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { Global } from './global';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    token;
    constructor(public authService: AuthService, private global: Global, private router : Router, private alertService: AlertService, private spinner: NgxSpinnerService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;  
        return this.verifyLogin(url);
    }

    verifyLogin(url) : boolean{
        if(!this.isLoggedIn()){
            this.router.navigate(['']);
            this.spinner.hide();
            return false;
        }
        else if(this.isLoggedIn()){
            return true;
        }
    }
    public isLoggedIn(): boolean{
        let status = false;
        if( localStorage.getItem('isLoggedIn') == "true"){
          status = true;
        }
        else{
          status = false;
        }
        return status;
    }
    
}