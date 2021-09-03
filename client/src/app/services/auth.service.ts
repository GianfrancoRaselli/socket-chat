import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User } from "../models/User";
import { map } from 'rxjs/operators';

const SIGNUP = gql`
  mutation signUp($username: String!, $password: String!, $fullname: String!) {
    signUp(username: $username, password: $password, fullname: $fullname) {
      user {
        _id
        username
      }
      token
    }
  }
`;

const SIGNIN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      user {
        _id
        username
      }
      token
    }
  }
`;

const PROFILE = gql`
  {
    profile {
      _id
      username
      fullname
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo, private router: Router) { }

  signUp(user: User): any {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: {
        username: user.username,
        password: user.password,
        fullname: user.fullname
      }
    });
  }

  signIn(user: User): any {
    return this.apollo.mutate({
      mutation: SIGNIN,
      variables: {
        username: user.username,
        password: user.password
      }
    });
  }

  profile(): any {
    return this.apollo.watchQuery({
      query: PROFILE
    }).valueChanges.pipe(
      map((res: any) => {
        return res.data.profile;
      })
    );
  }

  loggedIn(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.router.navigate(["/signin"]);
  }

}