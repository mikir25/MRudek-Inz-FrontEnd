import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './Models/login';
import { HttpAccountService } from './Services/http-account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Praca';
  roleUser: string = "";
  nameUser: string = "";
  userId: number = 0;
  NowUrl: string = "";

  constructor(private account: HttpAccountService, private url: Router) { }

  ngAfterContentChecked(): void {
    this.NowUrl = this.url.url;
    
    this.account.idUser.subscribe((id) => { if (id != "") { this.userId = Number(id) } });
    this.account.nameUser.subscribe((name) => { this.nameUser = name });
    this.account.roleUser.subscribe((role) => { this.roleUser = role });
    
  }
  
  Logout() {
    this.account.logout();
    
    this.userId = 0;
    this.nameUser = "";
    this.roleUser = "";
    
  }


}
