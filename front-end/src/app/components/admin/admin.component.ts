import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
	private _auth:AuthService,
	private _router:Router
  ) { }

  ngOnInit() {
  }
  
  logout(){
	  this._auth.logOut();
	  this._router.navigate(['/adminShop']);
  }

}
