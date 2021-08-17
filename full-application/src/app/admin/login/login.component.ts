import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authAdmin:AdminAuthService , private route: Router) { }
   admin = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(6)])
  })
  ngOnInit(): void {
  }
  get email(){
    return this.admin.get('email');
  }
  get password(){
    return this.admin.get('password');
  }
  loginSubmit(){
    if(this.admin.value.email =="mnoumanb@gmail.com" && this.admin.value.password =="nouman123" )
    {
      this._authAdmin.isLoggedIn = true;
      this.route.navigate(['/admin/dashboard']);

    }else
    {
      console.log("Wrong Email or Password")
    }
  }

}
