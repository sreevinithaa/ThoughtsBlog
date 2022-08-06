import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThoughtServiceService } from 'src/app/services/thought-service.service';
import { Router } from '@angular/router';
import { Comment } from 'src/app/Comment'
@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() thoughtId? :string|null=null;
  IsLoggedIn:boolean=false;
  error?: string;
  constructor(private router: Router,private auth: AuthService,private thoughtService:ThoughtServiceService) { }

  ngOnInit(): void {
    this.IsLoggedIn=this.auth.loggedIn();
  }
  onSubmit(addComment:any)
  {
console.log(addComment);
if (!addComment.form.controls.commentText.value) {
  this.error='Please enter the comment!';
  return;
}
const comment: Comment = {
  commentText: addComment.form.controls.commentText.value,
  commentAuthor: this.auth.getProfile().data.username
};
this.thoughtService.addComment(comment,this.thoughtId?this.thoughtId:null).subscribe(() => {
  this.router.navigateByUrl('/me');
});
  }
}
