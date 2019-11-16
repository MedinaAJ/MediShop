import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	private url: string;
	
	constructor(
		private _http:Http
	) {
		this.url = GLOBAL.url;
	}
  
  async inicio_sesion(employee:any, getToken?:boolean) { 
	let headers = new Headers({
		'Content-type':'Application/json'
	});
	let options = new RequestOptions({headers: headers});
	
	const res = await this._http.post(this.url + "inicio_sesion", employee, options).toPromise();
	  console.log("LLEGA "+res.json())
	  return res.json();
  }
}
