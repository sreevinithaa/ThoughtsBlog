import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThoughtServiceService } from 'src/app/services/thought-service.service';
import { Thought } from 'src/app/Thought';
import { Router } from '@angular/router';
@Component({
  selector: 'app-thought-form',
  templateUrl: './thought-form.component.html',
  styleUrls: ['./thought-form.component.css'],
})
export class ThoughtFormComponent implements OnInit {
  IsLoggedIn: boolean = false;
  thoughtText:string|null=null;
  @Output() onAddThought: EventEmitter<Thought> = new EventEmitter();
  error?: string;
  constructor( private router: Router,private auth: AuthService,private thoughtService:ThoughtServiceService) {}

  ngOnInit(): void {
    this.IsLoggedIn = this.auth.loggedIn();
  }
  onSubmit(addThought: any) {
    this.error="";
    if (!this.thoughtText) {
      this.error='Please enter the thought!';
      return;
    }
    const thought: Thought = {
      thoughtText: this.thoughtText,
      thoughtAuthor: this.auth.getProfile().data.username
    };
    this.onAddThought.emit(thought);
    this.thoughtText="";
  }
}
