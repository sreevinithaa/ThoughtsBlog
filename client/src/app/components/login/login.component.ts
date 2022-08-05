import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:string| null = null;
  email: string | null = "";
  password: string | null = "";
  constructor( private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
  }
  
  onSubmit(login: any) {
  this.email="";
    if (!login.form.controls.email.value) {
      this.error='Please enter the email!';
      return;
    }
    if (!login.form.controls.password.value) {
      this.error='Please enter the password!';
      return;
    }

    const user: User = {
      username: login.form.controls.email.value,
      password: login.form.controls.password.value
    };
  
   this.authService.loginUser(user).subscribe(() => {
    this.router.navigateByUrl('/');
  });
   
 
  }
}
