import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserauthService } from '../userauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required, Validators.minLength(10)])
  })
  constructor(private _userauth:UserauthService, private route: Router) { }

  ngOnInit(): void {
  }

  get email(){
    return this.user.get('email');
  }
  get password(){
    return this.user.get('password');
  }
  loginSubmit(){
    if(this.user.value.email == "aliasghar@gmail.com" && this.user.value.password=="ali12345678")
    {
      this._userauth.isLoggedIn = true;
      this.route.navigate(['/user/chating']);
    }else{
      console.log("credential dont match");
    }
  }
}
