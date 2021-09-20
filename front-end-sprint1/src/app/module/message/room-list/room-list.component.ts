import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import * as firebase from 'firebase';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  nickname = '';
  rooms = [];
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private router: Router,
              public datepipe: DatePipe,
              @Inject(AngularFireDatabase) private storage: AngularFireDatabase) {
    this.nickname = localStorage.getItem('nickname');
    this.storage.database.ref('rooms/').on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.isLoadingResults = false;
    });
  }

  ngOnInit(): void {
  }

  enterChatRoom(roomname: string) {
    const chat = {roomname: '', nickname: '', message: '', date: '', type: ''};
    chat.roomname = roomname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.message = `${this.nickname} enter the room`;
    chat.type = 'join';
    const newMessage =   this.storage.database.ref('chats/').push();
    newMessage.set(chat);

    this.router.navigate(['/chatRoom', roomname]);
  }

  backToHomePage() {
    this.router.navigate(['/homepage']);
  }
}
