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

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  public Editor = ClassicEditor;
  public gameForm: FormGroup;
  public gameType: GameType[] = [];
  private gameId: number;
  imageGame: String;
  private selectedImage: any;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private appComponent: AppComponent,
              private gameService: GameService,
              private gameTypeService: GameTypeService,
              public activatedRoute: ActivatedRoute,
              public router: Router, private toastr: ToastrService) {
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
      content: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      gaming: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^\\d+$")]),
      gameType: new FormControl('', [Validators.required]),
    });
  }

  findGame(){
    this.activatedRoute.params.subscribe(data => {
      this.gameId = data.id;
      this.gameService.getById(this.gameId).subscribe(data2 => {
        this.gameForm.patchValue(data2);
        this.imageGame = data2.image;
      });
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
          this.imageGame = url;
          Swal.close();
        });
      })
    ).subscribe();
  }


  editGame() {
    if (this.gameForm.valid) {
      this.gameService.updateGame(this.gameId,this.gameForm.value,).subscribe(data => {
        console.log(this.gameForm.value);
        this.router.navigateByUrl('/game');
        this.toastr.success('Thanks!', 'Edit game successfully !');
      });
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if(this.selectedImage !== this.imageGame){
      this.loadImg();
    }
  }

  get newsImageName() {
    return this.gameForm.get('image');
  }

  reset() {
    this.findGame();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
