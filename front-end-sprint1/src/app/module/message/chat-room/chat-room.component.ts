import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import * as firebase from 'firebase';
import {DatePipe} from '@angular/common';
import {snapshotToArray} from '../room-list/room-list.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {FirebaseApp} from '@angular/fire';
import {AngularFireDatabase} from '@angular/fire/database';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;
  chatForm: FormGroup;
  nickname = '';
  roomname = '';
  message = '';
  chats = [];
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public datepipe: DatePipe,
              @Inject(AngularFireDatabase) private storage: AngularFireDatabase) {
    this.nickname = localStorage.getItem('nickname');
    this.roomname = this.route.snapshot.params.roomname;

    this.storage.database.ref('chats/').orderByChild('roomname').equalTo(this.roomname).on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
    });
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    const newMessage = this.storage.database.ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

  exitChat() {
    const chat = {roomname: '', nickname: '', message: '', date: '', type: ''};
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.message = `${this.nickname} leave the room`;
    chat.type = 'exit';
    const newMessage = this.storage.database.ref('chats/').push();
    newMessage.set(chat);
    if (this.nickname === 'Admin') {
      this.router.navigate(['/roomList']);
    } else {
      this.router.navigate(['/']);
    }
  }


}
