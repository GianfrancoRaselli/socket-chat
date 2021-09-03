import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

import { User } from "../../models/User";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user: User = {
    username: "",
    password: ""
  };

  error: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signIn(this.user).subscribe(
      (res: any) => {
        this.error = false;
        this.errorMessage = "";
        localStorage.setItem("token", res.data.signIn.token);
        localStorage.setItem("_id", res.data.signIn.user._id || "");
        localStorage.setItem("username", res.data.signIn.user.username || "");
        this.router.navigate(["/profile"]);
      },
      (err: any) => {
        this.error = true;
        this.errorMessage = err.message;
      }
    );
  }

}
