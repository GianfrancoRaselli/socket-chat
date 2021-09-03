import { Component, OnInit } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from "../../services/auth.service";

import { User } from "../../models/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    username: "",
    password: "",
    fullname: ""
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    if (localStorage.getItem('token')) {
      this.authService.profile().subscribe(
        (res: any) => {
          this.user = res;
        },
        (err: any) => {
          if (err.message === 'Acceso denegado') this.authService.logout();
        }
      )
    } else {
      this.authService.logout();
    }
  }

}
