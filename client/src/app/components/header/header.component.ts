import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service'
import { User } from 'src/app/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isLoggedIn:boolean=false;
profileUser:any|null=null;
  constructor(private auth :AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.auth.loggedIn();
    if(this.isLoggedIn)
    {
      this.profileUser=this.auth
      .getProfile();
      
    console.log(this.profileUser);
    }
  }
  logout()
  {
    this.auth.logoutUser();
  }
}
