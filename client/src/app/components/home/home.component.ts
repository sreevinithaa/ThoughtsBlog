import { Component, OnInit } from '@angular/core';
import { ThoughtServiceService } from '../../services/thought-service.service';
import { Thought } from '../../Thought';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  thoughts: Thought[] = [];
title:string="Some Feed for Thought(s)...";
showTitle:boolean=true;
  constructor(private thoughtService: ThoughtServiceService) {}

  ngOnInit(): void {
    this.thoughtService
      .getThoughts()
      .subscribe((thought) => (this.thoughts = thought));
    
  }
  addThought()
  {
    
  }
}
