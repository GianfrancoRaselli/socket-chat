import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import {tap} from 'rxjs/operators';

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: any, next: any) {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }

}
