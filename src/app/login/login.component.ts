import { Component, OnInit } from '@angular/core';
import { recobrosServices } from '../service/recobro.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Global } from '../global';
import { ILogin } from '../login';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: ILogin={login: "", contrasena:""};
  loginForm: FormGroup;
  returnUrl: string;

  login: string;
  contrasena: string;
  hide: boolean;
  loginControl = new FormControl('', [Validators.required,]);
  contrasenaControl = new FormControl('', [Validators.required,]); 

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private global: Global, private recobrosService: recobrosServices, private router: Router, private alertService: AlertService, private spinner: NgxSpinnerService) { }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/menu';
    this.authService.logout();

    clearTimeout(this.authService.myTimeOut);
    clearTimeout(this.authService.myTimeOutAux);

    this.hide = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.alertService.info("Inicie sesión en el módulo de recobros");
    }, 1000);       
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  iniciarSesion(){    
    this.spinner.show(); 
    this.model.login = (<HTMLInputElement>document.getElementById("usuario")).value;
    this.model.contrasena = (<HTMLInputElement>document.getElementById("contrasena")).value;
    this.global.login= this.model.login;
    this.global.contrasena= this.model.contrasena;
    if(this.global.login=="" || this.model.contrasena==""){      
      this.spinner.hide(); 
      this.alertService.warning("Complete los campos");
    }else if((this.global.login=="recobro" || this.global.login=="RECOBRO") ){
      if(this.model.contrasena=="recobro1"){
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.global.login);
        localStorage.setItem('pass', this.global.contrasena);
        this.router.navigate([this.returnUrl]); 
      }else{
        this.alertService.warning("Login o password inválido");
        this.spinner.hide();
      }      
    }else{
      this.recobrosService.findMenuLogin(this.global.login, this.global.contrasena).subscribe(data => {
        if(data.length>1){
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('token', this.global.login);
          localStorage.setItem('pass', this.global.contrasena);
          this.router.navigate([this.returnUrl]);     
        }else{        
          this.spinner.hide(); 
          //this.alertService.warning("El usuario no existe en la aplicación de recobros");
          this.alertService.warning("Error: "+data);
        }
      }, error => { 
        this.spinner.hide(); 
        this.alertService.warning("Falló la conexión: "+error);
       });
    }   
  }

}
