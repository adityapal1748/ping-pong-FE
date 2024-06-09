import { Component, OnInit } from '@angular/core';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})
export class GameRoomComponent implements OnInit {
  roomId: any;
  opponent: any;
  order: any;
  gameData: any;

  constructor(private route: ActivatedRoute, private service:AppService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId')!;
    this.opponent = history.state.opponent;
    this.order = history.state.order;

    this.service.getGameData(this.roomId).subscribe(data => {
      this.gameData = data;
    });
  }
  openGameModal(): void {
    const dialogRef = this.dialog.open(GameModalComponent, {
      width: '400px', // Set the width of the modal dialog
      data: { roomId: this.roomId, opponent: this.opponent, order: this.order } // Pass any data needed by the modal component
    });

    // Handle the response from the modal if needed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the modal is closed
    });
  }

}
