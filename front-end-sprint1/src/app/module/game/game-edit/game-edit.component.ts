import {Component, Inject, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GameType} from "../../../model/game/game-type";
import {AppComponent} from "../../../app.component";
import {GameService} from "../../../service/game/game.service";
import {GameTypeService} from "../../../service/game/gameType/game-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import Swal from "sweetalert2";
import {finalize} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {Game} from "../../../model/game/game";

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  public Editor = ClassicEditor;
  public gameForm: FormGroup;
  public game: Game;
  public gameType: GameType[] = [];
  private gameId: number;
  imageGame: string;
  private selectedImage: any;
  listError: any = '';

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private appComponent: AppComponent,
              private gameService: GameService,
              private gameTypeService: GameTypeService,
              public activatedRoute: ActivatedRoute,
              public router: Router, private toastr: ToastrService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initfrom();
    this.getAllGameType();
    this.findGame();
  }

  initfrom() {
    this.gameForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      trailer: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
      image: new FormControl('', [Validators.required]),
      gaming: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^\\d+$")]),
      gameType: new FormControl('', [Validators.required]),
    });
  }

  findGame() {
    this.activatedRoute.params.subscribe(data => {
      this.gameId = data.id;
      this.gameService.getById(this.gameId).subscribe(data2 => {
        this.gameForm.patchValue(data2);
        this.imageGame = data2.image;
      });
    }, error => {
      this.toastr.error('Warning!', 'Game not found!');
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
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55'
    });
    const nameImg = this.getCurrentDateTime() + this.selectedImage?.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.gameForm.value.image = url;
          this.imageGame = url;
          Swal.close();
        });
      })
    ).subscribe();
  }


  editGame() {
    if (this.gameForm.valid) {
      this.gameService.updateGame(this.gameId, this.gameForm.value,).subscribe(data => {
        console.log(this.gameForm.value);
        this.router.navigateByUrl('');
        this.toastrEdit();
      }, error => {
        console.log(error);
        if (error.status === 400) {
          this.listError = error.error;
        }
        this.toastr.error('Warning!', 'Edit game fail !');
      });
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage !== this.imageGame) {
      this.loadImg();
    }
  }

  get newsImageName() {
    return this.gameForm.get('image');
  }

  reset() {
    this.game = this.gameForm.value;
    Swal.fire({
      title: 'Are you sure to Reset?',
      text: 'This action cannot be undone !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55'
    }).then((result) => {
      if (result.value) {
        this.findGame();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.gameForm.patchValue(this.game);
        console.log(this.game);
        console.log(this.gameForm.value);
      }
    })
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  back() {
    console.log("back1");
    this.game = this.gameForm.value;
    Swal.fire({
      title: 'Are you sure back to Home?',
      text: 'Changes will not be saved !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55'
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.gameForm.patchValue(this.game);
        console.log(this.game);
        console.log(this.gameForm.value);
      }
    })
  }

  toastrEdit(){
    this.toastr.success('Thanks!', 'Edit game successfully !');
  }
}
