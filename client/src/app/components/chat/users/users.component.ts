import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Output() changeChat = new EventEmitter<User>();

  @Input() chatUsers: User[] = [];

  username: String = '';
  usersFound: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  searchUsers() {
    if (this.username) {
      this.userService.searchUsers(this.username).subscribe(
        (res: any) => {
          console.log(res);
          this.usersFound = res;
        },
        (err: any) => {
          console.log(err);
        }
      )
    } else {
      this.usersFound = [];
    }
  }

  clearUsers() {
    this.usersFound = [];
  }

  chooseUser(user: User) {
    this.changeChat.emit(user);
  }

}
