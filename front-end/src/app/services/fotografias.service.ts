import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FotografiasService {
  private url: string;
  
  constructor(private _http:Http) { 
	this.url = GLOBAL.url;
  }
  
  getFotografias(){
	  return this._http.get(this.url + 'fotografias')
		.toPromise().then(res => res.json());
  }
}
 