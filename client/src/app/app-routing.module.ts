import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from "./components/index/index.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SignupComponent } from "./components/signup/signup.component";
import { SigninComponent } from "./components/signin/signin.component";
import { ChatComponent } from "./components/chat/chat.component";

import { AuthGuard, SignGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [SignGuard]
  },
  {
    path: "signin",
    component: SigninComponent,
    canActivate: [SignGuard]
  },
  {
    path: "messages",
    component: ChatComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
