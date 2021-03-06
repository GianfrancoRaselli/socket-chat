import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { AuthService } from "./auth.service"; 

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  io = io(environment.SOCKET_URL, {
    withCredentials: true,
    autoConnect: false,
  });

  constructor(private authService: AuthService) { }

  connect() {
    if (this.authService.loggedIn()) {
      this.io.connect();
      this.io.emit('join', this.authService.getToken());
    }
  }
  
}
