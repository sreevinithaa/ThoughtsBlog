import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  error?: string;
  username: string | null = null;
  password: string | null = null;
  email: string | null = null;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {}
  onSubmit(signUp: any) {
    this.error = '';
    if (!this.username) {
      this.error = 'Please enter the username!';
      return;
    }
    if (!this.password) {
      this.error = 'Please enter the password!';
      return;
    }
    if (!this.email) {
      this.error = 'Please enter the email!';
      return;
    }
    const user: User = {
      username: this.username,
      password: this.password,
      email: this.email,
    };

    this.authService.addUser(user).subscribe(() => {
      this.username = '';
      this.password = '';
      this.email = '';
      this.router.navigateByUrl('/');
    });
  }
}
