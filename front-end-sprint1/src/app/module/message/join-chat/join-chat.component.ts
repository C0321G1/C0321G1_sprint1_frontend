import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import * as firebase from 'firebase';
import {snapshotToArray} from '../room-list/room-list.component';
import {DatePipe} from '@angular/common';
import {AccountService} from '../../../service/account/account.service';
import {Account} from '../../../model/account/account';
import {Role} from '../../../model/account/role';

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
  nickname = 'Admin';
  refRooms = firebase.database().ref('rooms/');
  refUsers = firebase.database().ref('users/');
  matcher = new MyErrorStateMatcher();
  role: string;

  constructor(private router: Router, public datepipe: DatePipe,
              private accountService: AccountService,
              // private tokenStorage: TokenStorage
  ) {
      // this.findUser();
  }

  ngOnInit(): void {
  }

  enterChatRoom(roomname: string) {
    localStorage.setItem('nickname', this.nickname);
    this.addUser(this.nickname);
    if (this.nickname !== 'Admin') {
      this.addRoom(roomname);
      const chat = {roomname: '', nickname: '', message: '', date: '', type: ''};
      console.log(chat.date);
      chat.roomname = roomname;
      chat.nickname = this.nickname;
      chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
      chat.message = `${this.nickname} enter the room`;
      chat.type = 'join';
      const newMessage = firebase.database().ref('chats/').push();
      newMessage.set(chat);

      this.router.navigate(['/chatRoom', roomname]);
    } else {
      this.router.navigate(['/roomList']);
    }
  }

  addRoom(roomName: any) {
    const room = {roomname: ''};
    room.roomname = roomName;
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

  // findUser() {
  //   this.role = this.tokenStorage.getUser().roles;
  //   if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_EMPLOYEE') {
  //     this.nickname = 'Admin';
  //   } else {
  //     this.nickname = this.tokenStorage.getUser().username;
  //   }
  // }
}
