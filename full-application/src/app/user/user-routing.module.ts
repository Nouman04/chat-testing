import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent} from './register/register.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { UserguardGuard } from './userguard.guard'
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path:"user" , 
  children:[
    {path :"login" , component: LoginComponent  },
    {path :"register" , component: RegisterComponent },
    {path :"dashboard" , component: DashboardComponent , canActivate: [UserguardGuard]},
    {path :"chating", component: ChatComponent , canActivate: [UserguardGuard]},
            ] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
