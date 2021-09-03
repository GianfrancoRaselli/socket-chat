import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { Message } from 'src/app/models/Message';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  showUsers: boolean = true;
  chatUsers: User[] = [];
  userConversation: User = {};
  chatsWithUserConversation: Message[] = [];

  getUsersWithConversationQuery: any;
  getUsersWithConversationSubscription: any;

  getMessagesBetweenUsersQuery: any;
  getMessagesBetweenUsersSubscription: any;

  constructor(private userService: UserService, private messageService: MessageService, private socket: SocketService) { }

  ngOnInit(): void {
    this.suscribegetUsersWithConversation();
    this.suscribegetMessagesBetweenUsers();
  }

  ngOnDestroy(): void {
    this.unsuscribegetUsersWithConversation();
    this.unsuscribegetMessagesBetweenUsers();
  }

  suscribegetUsersWithConversation(): void {
    this.getUsersWithConversationQuery = this.userService.getUsersWithConversation();
    this.getUsersWithConversationSubscription = this.getUsersWithConversationQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.getUsersWithConversation;
      })
    ).subscribe(
      (res: any) => {
        this.chatUsers = res;
      },
      (err: any) => console.log(err)
    );
  }

  refreshgetUsersWithConversation(): void {
    this.getUsersWithConversationQuery.refetch();
  }

  unsuscribegetUsersWithConversation(): void {
    this.getUsersWithConversationSubscription.unsubscribe();
  }

  suscribegetMessagesBetweenUsers(): void {
    this.getMessagesBetweenUsersQuery = this.messageService.getMessagesBetweenUsers(this.userConversation);
    this.getMessagesBetweenUsersSubscription = this.getMessagesBetweenUsersQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.getMessagesBetweenUsers;
      })
    ).subscribe(
      (res: any) => {
        this.chatsWithUserConversation = res;
        this.socket.connect();
        this.showUsers = false;
      },
      (err: any) => console.log(err)
    );
  }

  refreshgetMessagesBetweenUsers(): void {
    this.getMessagesBetweenUsersQuery.refetch();
  }

  unsuscribegetMessagesBetweenUsers(): void {
    this.getMessagesBetweenUsersSubscription.unsubscribe();
  }

  changeChat(user: User) {
    this.userConversation = user;
    this.refreshgetMessagesBetweenUsers();
  }

  backToUsers() {
    this.refreshgetUsersWithConversation();
    this.showUsers = true;
    this.socket.io.disconnect();
    this.userConversation = {};
    this.chatsWithUserConversation = [];
  }

}
