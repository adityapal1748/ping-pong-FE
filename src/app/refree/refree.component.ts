import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from '../services/socket.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-refree',
  templateUrl: './refree.component.html',
  styleUrls: ['./refree.component.css']
})
export class RefreeComponent implements OnInit {
  players:any[] = [];
  ready = false
  isLoading = true;
  role = localStorage.getItem('role')
  gameRoom: any;
  constructor(private router:Router, 
    private socketService:SocketService, 
    private _snackBar:MatSnackBar,
    private service:AppService) { }

  ngOnInit(): void {
    // this.getMessage();
    if(this.role === 'admin'){
      this.playerJoined();
      this.playersReady();
      
    }else{
      this.joinRoom()
    }
    // this.getAllPlayerList()
    // setTimeout(() => {
      
    // }, 5000);
     
  }
  playersReady() {
    this.socketService.getPlayerReady().subscribe((res) =>{
      this.players.filter((data:any) =>{
        console.log(data,res)
        if(data.id == res.data.id){
          data.ready = res.data.ready
        }
      })
    })
  }
  allPlayersReady(){
    if(this.players.length === 2 && this.players.some(obj =>obj.ready)){
      return false
    }else{
      return true
    }
  }
  start(){
    // this.router.navigate(["game-room"])
    this.ready = !this.ready;
    let payload:any = {
      "ready":this.ready,
      "id":localStorage.getItem('id')
    }
    this.socketService.sendReady(payload)

  }
  joinRoom(){
    this.socketService.gameRoomAssign().subscribe(res =>{
      this.gameRoom = res
      this.router.navigate([`/game-room/${this.gameRoom.roomId}`], { state: { opponent: this.gameRoom.opponent, order: this.gameRoom.order } });
    })
  }
  playerJoined(){
    this.socketService.onPlayerJoined().subscribe((msg:any) =>{
      this.players.push(msg);
      console.log(this.players);
      
      this._snackBar.open(`${msg.name} has joined`,'',{
        duration:3000
      })
    });
    
  }
  // getAllPlayerList(){
  //   this.service.activePlayers().subscribe(res =>{
  //     console.log(res)
  //   })
  // }
  

}
