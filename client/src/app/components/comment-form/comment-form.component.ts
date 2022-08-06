import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() thoughtId?:string;
  IsLoggedIn:boolean=false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.IsLoggedIn=this.auth.loggedIn();
  }

}
