import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {
  isLoggedIn : boolean;
  isLoggedOut: boolean;
  constructor() { 
    this.isLoggedIn = false;
  }
  
}
