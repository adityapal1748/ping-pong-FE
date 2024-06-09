import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.usersJoined()
  }
  title = 'ping-pong';
  usersJoined() {
    this.socketService.onNewUser().subscribe((el:any) => {
      localStorage.setItem("socketId",el?.socketId,)
    })
  }
}
