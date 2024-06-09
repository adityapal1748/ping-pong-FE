import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  login(payload:any){
    return this.http.post("http://localhost:8000/api/auth/login",payload)
  }
  activePlayers(){
    return this.http.get("http://localhost:8000/api/auth/activePlayers")
  }
  getGameData(roomId: string) {
    return this.http.get(`http://localhost:8000/api/games/gameData/${roomId}`);
  }
}
