import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private router:Router = new Router();
  redirect(){
   window.open("http://github.com/guzztavo2", "_blank");
  }
}


