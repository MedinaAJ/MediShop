import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  getIdentity(){
	  let identity = JSON.parse(localStorage.getItem('identity_user'));
	  if(identity){
		  return identity;
	  }else{
		  return null;
	  }
  }
  
  logOut(){
	  localStorage.removeItem('identity_user');
	  localStorage.clear();
  }
}
