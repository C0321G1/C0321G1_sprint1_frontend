import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import {AccountService} from '../../../service/account/account.service';
import {AngularFireDatabase} from '@angular/fire/database';

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
  nickname = 'vinhdn';
  refRooms = this.storage.database.ref('rooms/');
  refUsers = this.storage.database.ref('users/');
  matcher = new MyErrorStateMatcher();
  role: string;

  constructor(private router: Router, public datepipe: DatePipe,
              private accountService: AccountService,
              @Inject(AngularFireDatabase) private storage: AngularFireDatabase
              // private tokenStorage: TokenStorage
  ) {
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
      const newMessage = this.storage.database.ref('chats/').push();
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
        const newRoom = this.storage.database.ref('rooms/').push();
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
        const newUser = this.storage.database.ref('users/').push();
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
