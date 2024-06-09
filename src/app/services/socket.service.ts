import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any
  constructor() {
    this.socket = io('http://localhost:8000');

  }
  sendMessages(message: any) {
    this.socket.emit("message", message)
  }

  connect(token: string) {
    this.socket.auth = { token };
    this.socket.connect();
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  getMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('message', (data: string) => {
        observer.next(data)
      })
    })
  }
  onPlayerJoined(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('playerJoined', (data: any) => {
        observer.next(data);
      });
    });
  }
  onAdminJoined(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('newAdminKey', (data: any) => {
        observer.next(data);
      });
    });
  }
  onNewUser(){
    return new Observable<any>(observer => {
      this.socket.on('newConnection', (data: any) => {
        observer.next(data);
      });
    });
  }
  newUser(){
    return new Observable<any>(observer => {
      this.socket.on('newUser', (data: any) => {
        observer.next(data);
      });
    });
  }
  sendJoinedMessage(){
    this.socket.emit('playerJoined',localStorage.getItem('token'))
  }
  sendReady(payload:any){
    this.socket.emit('ready',payload)
  }
  getPlayerReady(){
    return new Observable<any>(observer => {
      this.socket.on('playerReady', (data: any) => {
        observer.next(data);
      });
    });
  }
  gameRoomAssign(){
    return new Observable<any>(observer => {
      this.socket.on('game-room-assigned', (data: any) => {
        observer.next(data);
      });
    });
  }
}
