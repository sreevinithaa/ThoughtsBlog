import { Component, OnInit } from '@angular/core';
import { Thought } from 'src/app/Thought';
import { Comment } from 'src/app/Comment';
import { ActivatedRoute } from '@angular/router';
import { ThoughtServiceService } from '../../services/thought-service.service';
@Component({
  selector: 'app-single-thought',
  templateUrl: './single-thought.component.html',
  styleUrls: ['./single-thought.component.css']
})
export class SingleThoughtComponent implements OnInit {
  thought? : Thought
  thoughtId? :string
  constructor(private route: ActivatedRoute,private thoughtService:ThoughtServiceService) {
    this.thoughtId = this.route.snapshot.paramMap.get('id')?.toString();
    if(this.thoughtId)
    {
     this.thoughtService
       .getSingleThought(this.thoughtId)
       .subscribe((thought) => (this.thought = thought));
    }
   }

  ngOnInit(): void {
  }
  addComment(comment:Comment)
  {
    this.thoughtService.addComment(comment,this.thoughtId?this.thoughtId:"").subscribe((com) => {
    this.thought=com;
     
     
    });
  }
}
