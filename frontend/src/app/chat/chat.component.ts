import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user.model';

interface Message {
  username: string,
  text: string
}

interface ServerMessage {
  type: string,
  message: Message
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit, OnDestroy {
  users!: User[];
  usernameText = '';
  messageText = '';
  messages: Message[] = [];
  ws!: WebSocket;

  constructor() { }

  ngOnInit() {
    this.ws = new WebSocket('ws://localhost:8000/chat');
    this.ws.onclose = () => console.log('ws closed');

    this.ws.onmessage = event => {
      const decodedMessage: ServerMessage = JSON.parse(event.data);

      if (decodedMessage.type === 'NEW_MESSAGE') {
        this.messages.push(decodedMessage.message);
      }
    };
  }

  sendMessage() {
    this.ws.send(JSON.stringify({
      type: 'SEND_MESSAGE',
      text: this.messageText
    }));

    this.messageText = '';
  }

  ngOnDestroy() {
    this.ws.close();
  }
}
