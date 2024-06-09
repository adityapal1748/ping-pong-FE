import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefreeComponent } from './refree/refree.component';
import { PlayersComponent } from './players/players.component';
import { LoginComponent } from './login/login.component';
import { GameRoomComponent } from './game-room/game-room.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"lobby",
    component:RefreeComponent
  },{
    path:"players",
    component:PlayersComponent
  },{
    path:"game-room",
    component:GameRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
