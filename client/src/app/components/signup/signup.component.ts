import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

import { User } from "../../models/User";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User = {
    username: "",
    password: "",
    fullname: ""
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.authService.signUp(this.user).subscribe(
      (res: any) => {
        localStorage.setItem("token", res.data.signUp.token);
        localStorage.setItem("_id", res.data.signUpuser._id || "");
        localStorage.setItem("username", res.data.signUp.user.username || "");
        this.router.navigate(["/profile"]);
      },
      (err: any) => console.log(err)
    );
  }

}
