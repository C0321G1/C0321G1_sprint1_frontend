import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../service/account/auth.service";
import {TokenStorageService} from "../../../service/account/token-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSignIn: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              public router: Router, public toastr: ToastrService) {
    this.formSignIn = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.formSignIn.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.toastr.success("Sign in", "success")

        // @ts-ignore
        if (this.roles == "ROLE_USER") {
          this.router.navigateByUrl('/guest-homepage');
        }
        
        console.log(data)
      },
      err => {
        this.toastr.error('Username or password is incorrect', 'SingIn error ', {
          timeOut: 2000,
          extendedTimeOut: 1500
        });
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reset() {
    this.formSignIn.reset();
  }
}
