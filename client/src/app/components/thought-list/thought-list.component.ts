import { Component, OnInit ,Input} from '@angular/core';
import { Thought } from 'src/app/Thought';

@Component({
  selector: 'app-thought-list',
  templateUrl: './thought-list.component.html',
  styleUrls: ['./thought-list.component.css']
})
export class ThoughtListComponent implements OnInit {
  @Input() thought?: Thought;
  @Input() showUsername: boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

}
