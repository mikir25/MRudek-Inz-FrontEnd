import { Component, OnInit } from '@angular/core';
import { Friend } from '../../Models/friend';
import { Mail } from '../../Models/mail';
import { HttpAccountService } from '../../Services/http-account.service';

@Component({
  selector: 'app-display-friends',
  templateUrl: './display-friends.component.html',
  styleUrls: ['./display-friends.component.css']
})
export class DisplayFriendsComponent implements OnInit {

  errorReturn: any;
  ErrorMessage: string = "";
  MailErrorReturn: any;
  MailErrorMessage: string = "";
  ErrorFriend: string = "";

  friendNew: Friend = new Friend;
  mail: Mail = new Mail;
  nameFriend: string = "";
  UserName: string = "";
  
  friends: Friend[] = [];
  constructor(private account: HttpAccountService) { }

  isMail: boolean = false;
  FrendIndex: number = -1;

  show(isMail: boolean, Index: number) {

    this.mail.contents = "";
    if (Index != this.FrendIndex)
    {
      this.isMail = true;
      this.FrendIndex = Index;
      return;
    }
    this.isMail = isMail;
      
  }


  ngOnInit(): void {
    this.getFriend();
    var subName = this.account.nameUser.subscribe(
      (name) => { this.UserName = name },
      error => { console.log(error) },
      () => { subName.unsubscribe(); }
    );
  }

  getFriend() {
    var sub = this.account.getFriend().subscribe(
      (date) => { this.friends = date },
      error => {
        console.log(error);
      },
      () => { sub.unsubscribe(); }
    );
  }

  createMail(idFrend: number) {
    this.mail.userName = this.UserName;
    this.mail.userId = idFrend;

    this.MailErrorMessage = "";
    this.MailErrorReturn = null;

    var sub = this.account.createMail(this.mail).subscribe(
      () => { },
      error => {
        
        console.log(error);
        this.MailErrorReturn = error.error;
        console.log(this.MailErrorReturn);
        if (typeof this.MailErrorReturn === 'string') {
          this.MailErrorMessage = this.MailErrorReturn;
        }

        if (this.mail.contents != "") {
          this.MailErrorMessage = "Błąd przesyłu"
        }
          
      },
      () => { this.MailErrorMessage = "Wiadomość wysłana"; this.isMail = false; this.FrendIndex = -1; this.getFriend(); sub.unsubscribe(); }
    );
  }

  createFriend() {
    this.ErrorMessage = "";
    this.ErrorFriend = "";
    this.errorReturn = null;

    var user = this.account.GetUserByName(this.nameFriend).subscribe(
      (date) => { this.friendNew.friend_Userid = date.id; this.friendNew.userName = date.name; },
      error => {
        console.log(error);
        this.ErrorFriend = "Użytkownik nie istnieje";
      },
      () => {
        user.unsubscribe;

        var sub = this.account.createFriend(this.friendNew).subscribe(
          () => { },
          error => {
            console.log(error);
            if (this.friendNew.userName == this.UserName) {
              this.ErrorFriend = "Nie możesz być swoim znajomym";
            }
            else {
              this.ErrorFriend = "Osoba jest już twoim znajomum";
            }
            
          },
          () => { this.ErrorMessage = ""; this.getFriend(); sub.unsubscribe(); }
        );
      }
    );

  }

  deleteFriend(id: number) {
    this.account.deleteFriend(id).subscribe(
      () => { },
      error => {
        console.log(this.errorReturn);
      },
      () => { this.getFriend(); }
    );
  }
}
