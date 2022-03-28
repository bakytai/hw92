import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthServiceService } from './services/auth-service.service';
import { ChatComponent } from './chat/chat.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatComponent,
    canActivate: [AuthServiceService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
