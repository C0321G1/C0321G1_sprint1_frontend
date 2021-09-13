import {Component, Inject, OnInit} from '@angular/core';
import {AppComponent} from '../../../app.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GameType} from "../../../model/game/game-type";
import {GameService} from "../../../service/game/game.service";
import {GameTypeService} from "../../../service/game/gameType/game-type.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {formatDate} from "@angular/common";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {
  public Editor = ClassicEditor;
  public gameForm: FormGroup;
  public gameType: GameType[] = [];
  image: String;
  private selectedImage: any;
  public isImage = false;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private appComponent: AppComponent,
              private gameService: GameService,
              private gameTypeService: GameTypeService,
              public router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initfrom();
    this.getAllGameType();
  }

  initfrom() {
    this.gameForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      trailer: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      gaming: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^\\d+$")]),
      gameType: new FormControl('', [Validators.required]),
    });
  }

  getAllGameType() {
    this.gameTypeService.getAllGameType().subscribe(data => {
      this.gameType = data;
    });
  }

  loadImg() {
    Swal.fire({
      title: 'Please wait !',
      imageUrl: '../../../../../assets/image/swal-nhung.gif',
      imageWidth: '170px',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    const nameImg = this.getCurrentDateTime() + this.selectedImage?.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.gameForm.value.image = url;
          this.image = url;
          this.isImage = true;
          Swal.close();
        });
      })
    ).subscribe();
  }

  save() {
    if (this.gameForm.valid) {
      this.gameForm.value.image = this.image;
      this.gameService.saveGame(this.gameForm.value).subscribe(data => {
        this.router.navigateByUrl('/game');
        this.toastr.success('Thanks!', 'Create new game successfully !');
      });
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if(this.selectedImage !== ""){
      this.loadImg();
    }
  }

  get newsImageName() {
    return this.gameForm.get('image');
  }

  reset() {
    this.isImage = false;
    this.image = "";
  }
}
