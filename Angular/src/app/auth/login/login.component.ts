import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  siteKey: string = '6LcUvD4pAAAAAFD4d7Ilmhck838ZyR4OyQbOqdjy';
  
  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', Validators.required)
  })
https: string|undefined;
  constructor(private usersService: UsersService, public router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }
     
  onSubmit() {
    
    var loginJson = JSON.stringify(this.form.value);
    this.usersService.loginCheck(loginJson)
    .subscribe((data => {
      if(data == true){
        alert("Login successful");
        var jsonData = JSON.parse(loginJson);
        this.storeLogin(jsonData['email']);
        this.router.navigate(['/dashboard']);
      }
      else{
        alert("Invalid Login"); 
      }
    }))
  }

  storeLogin(email: string){
    sessionStorage.setItem("email", email); 
  }
  checkLogin(){
    if (sessionStorage.length != 0){
      this.router.navigate(['/']);
    }
  }
  onResolved(captchaResponse: string): void {
    // Handle the reCAPTCHA response
    console.log('Captcha Response:', captchaResponse);
  }  
}
