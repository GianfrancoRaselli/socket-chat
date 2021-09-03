import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { Message } from 'src/app/models/Message';
import { SocketService } from 'src/app/services/socket.service';

declare var $: any;

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  @Output() backToUsers = new EventEmitter();

  @Input() userConversation: User = {};
  @Input() chatsWithUserConversation: Message[] = [];

  message: string = '';

  constructor(private socket: SocketService) {
    this.onReceiveMessage();
  }

  ngOnInit(): void {
  }

  sendMessage() {
    let messageInfo = {
      userToId: this.userConversation._id,
      message: this.message
    };
    this.message = '';
    this.chatsWithUserConversation.push(messageInfo);
    this.socket.io.emit('sendMessage', messageInfo);
    this.desplazarScrollHaciaAbajo();
  }

  onReceiveMessage() {
    this.socket.io.on('receiveMessage', (messageInfo) => {
      if (
        localStorage.getItem("_id") === messageInfo.userFromId
        || this.userConversation._id === messageInfo.userFromId
      ) {
        this.chatsWithUserConversation.push(messageInfo);
        this.desplazarScrollHaciaAbajo();
      }
    })
  }

  back() {
    this.backToUsers.emit();
  }

  desplazarScrollHaciaAbajo() {
    $('body').scrollTop = $('body').scrollHeight;
  }

}
