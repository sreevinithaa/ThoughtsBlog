import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() thoughtId?:string;
  constructor() { }

  ngOnInit(): void {
  }

}
