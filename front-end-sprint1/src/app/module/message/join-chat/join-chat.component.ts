import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import * as firebase from 'firebase';
import {snapshotToArray} from '../room-list/room-list.component';
import {DatePipe} from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-join-chat',
  templateUrl: './join-chat.component.html',
  styleUrls: ['./join-chat.component.css']
})
export class JoinChatComponent implements OnInit {
  loginForm: FormGroup;
  nickname = 'Admin';
  refRooms = firebase.database().ref('rooms/');
  refUsers = firebase.database().ref('users/');
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, public datepipe: DatePipe) {
  }

  ngOnInit(): void {

  }

  enterChatRoom(roomname: string) {
    localStorage.setItem('nickname', this.nickname);
    this.addUser(this.nickname)
    if (this.nickname !== 'Admin') {
      this.addRoom(roomname);
      const chat = {roomname: '', nickname: '', message: '', date: '', type: ''};
      chat.roomname = roomname;
      chat.nickname = this.nickname;
      chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
      chat.message = `${this.nickname} enter the room`;
      chat.type = 'join';
      const newMessage = firebase.database().ref('chats/').push();
      newMessage.set(chat);

      // firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (resp: any) => {
      //   let roomuser = [];
      //   roomuser = snapshotToArray(resp);
      //   const user = roomuser.find(x => x.nickname === this.nickname);
      //   if (user !== undefined) {
      //     const userRef = firebase.database().ref('roomusers/' + user.key);
      //     userRef.update({status: 'online'});
      //   } else {
      //     const newroomuser = {roomname: '', nickname: '', status: ''};
      //     newroomuser.roomname = roomname;
      //     newroomuser.nickname = this.nickname;
      //     newroomuser.status = 'online';
      //     const newRoomUser = firebase.database().ref('roomusers/').push();
      //     newRoomUser.set(newroomuser);
      //   }
      // });

      this.router.navigate(['/chatRoom', roomname]);
    } else {
      this.router.navigate(['/roomList']);
    }
  }

  addRoom(roomName: any) {
    const room = {roomname: ''};
    room.roomname = roomName
    this.refRooms.orderByChild('roomname').equalTo(room.roomname).once('value', (snapshot: any) => {
      if (!snapshot.exists()) {
        const newRoom = firebase.database().ref('rooms/').push();
        newRoom.set(room);
      }
    });
  }

  addUser(nickname: any) {
    const user = {nickname: nickname};
    this.refUsers.orderByChild('nickname').equalTo(user.nickname).once('value', snapshot => {
      if (snapshot.exists()) {
        localStorage.setItem('nickname', user.nickname);
      } else {
        const newUser = firebase.database().ref('users/').push();
        newUser.set(user);
        localStorage.setItem('nickname', user.nickname);
      }
    });
  }
}
