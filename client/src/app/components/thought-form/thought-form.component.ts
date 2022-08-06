import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-thought-form',
  templateUrl: './thought-form.component.html',
  styleUrls: ['./thought-form.component.css']
})
export class ThoughtFormComponent implements OnInit {
IsLoggedIn:boolean=false;
error?:string;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.IsLoggedIn=this.auth.loggedIn();
  }

}
