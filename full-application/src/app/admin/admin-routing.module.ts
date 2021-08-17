import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminguardGuard } from './adminguard.guard';
import { ConversationComponent } from './conversation/conversation.component';

const routes: Routes = [
  {path:"admin" , 
  children:[
    {path :"login" , component: LoginComponent},
    {path :"register" , component: RegisterComponent },
    {path :"chating", component: ConversationComponent},
    {path :"dashboard" , component: DashboardComponent, canActivate:[AdminguardGuard]}
            ] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
