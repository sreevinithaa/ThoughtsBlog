import { Component, OnInit } from '@angular/core';
import { Params,ActivatedRoute} from '@angular/router';
import { Thought } from 'src/app/Thought';
import { ThoughtServiceService } from '../../services/thought-service.service';
import { User } from 'src/app/User';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
username:string|null=null;

  constructor(private activateRoute: ActivatedRoute,private thoughtService:ThoughtServiceService) { }
  user:User|null=null;
  thoughts: Thought[] = [];
  ngOnInit(): void {
    this.username=this.activateRoute.snapshot.paramMap.get('id');
   if(this.username)
   {
    this.thoughtService
      .getThoughts(this.username)
      .subscribe((thought) => (this.thoughts = thought));
   }
  }

}
