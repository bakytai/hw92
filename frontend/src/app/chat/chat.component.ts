import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AppState } from '../store/types';

interface Message {
  user: User,
  text: string
}

interface ServerMessage {
  type: string,
  message: {
    messages: Message[],
    users: User[]
  }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;
  token!: string;
  userOne!: User;
  users: User[] = [];
  usernameText = '';
  messageText = '';
  messages: Message[] = [];
  ws!: WebSocket;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit() {
    this.ws = new WebSocket('ws://localhost:8000/chat');
    this.ws.onclose = () => console.log('ws closed');
    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.userOne = user;
        this.token = user.token
      }
    });


    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({type: 'LOGIN', token: this.token}))
    }

    this.ws.onmessage = event => {
      const decodedMessage: ServerMessage = JSON.parse(event.data);

      if (decodedMessage.type === 'NEW_MESSAGE') {
        this.messages = decodedMessage.message.messages;
      }

      if (decodedMessage.type === 'ALL_MESSAGE') {
        this.messages = decodedMessage.message.messages;
        this.users = decodedMessage.message.users;
      }

      if (decodedMessage.type === 'USER_LOGOUT') {
        this.users = decodedMessage.message.users;
      }
    };
  }

  sendMessage() {
    this.ws.send(JSON.stringify({
      type: 'SEND_MESSAGE',
      text: this.messageText,
      token: this.token
    }));

    this.messageText = '';
  }

  ngOnDestroy() {
    this.ws.close();
    this.userSub.unsubscribe();
  }
}
