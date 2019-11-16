import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public employee:any={};
	
  constructor(
    private _serviceLogin: LoginService,
	  private _router: Router
  ) { }

  ngOnInit() {
  }

  login(){
	  
	  this._serviceLogin.inicio_sesion(this.employee, true)
	  .then(response => {
		 localStorage.setItem('identity_user', JSON.stringify(response.employee));
		 this._router.navigate(['/admin/home']);
	  })
	  .catch(error => {
		 console.log(error);
	  });
  }
}
