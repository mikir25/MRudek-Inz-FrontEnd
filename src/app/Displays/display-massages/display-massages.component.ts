import { Component, OnInit } from '@angular/core';
import { Mail } from '../../Models/mail';
import { HttpAccountService } from '../../Services/http-account.service';

@Component({
  selector: 'app-display-massages',
  templateUrl: './display-massages.component.html',
  styleUrls: ['./display-massages.component.css']
})
export class DisplayMassagesComponent implements OnInit {


  errorReturn: any;
  ErrorMessage: string = "";
  mailNew: Mail = new Mail;
  UserName: string = "";
  nameRecipient: string = "";
  mails: Mail[] = [];
  constructor(private account: HttpAccountService) { }

  ngOnInit(): void {
    this.getMail();
    var subName = this.account.nameUser.subscribe(
      (name) => { this.UserName = name },
      error => { console.log(error) },
      () => { subName.unsubscribe(); }
    );
  }

  getMail() {
    var sub = this.account.getMail().subscribe(
      (date) => { this.mails = date },
      error => {
        console.log(error);
      },
      () => { sub.unsubscribe(); }
    );
  }

  createMail() {
    this.mailNew.userName = this.UserName;
    this.ErrorMessage = "";
    this.errorReturn = null;

    var user = this.account.GetUserByName(this.nameRecipient).subscribe(
      (date) => { this.mailNew.userId = date.id },
      error => {
        console.log(error);
        if (this.nameRecipient == "") {
          this.ErrorMessage = "Wypełnij wszystkie pola";
        } else {
          this.ErrorMessage = "Użytkownik nie istnieje";
        }

      },
      () => {

        user.unsubscribe;
        var sub = this.account.createMail(this.mailNew).subscribe(
          () => { },
          error => {
            console.log(error);
            this.ErrorMessage = "Wypełnij wszystkie pola";
          },
          () => { this.ErrorMessage = "Wiadomość wysłana"; this.getMail(); this.nameRecipient = ""; this.mailNew = new Mail; sub.unsubscribe(); }
        );
      }
    );

  }

  deleteMail(id: number) {
    this.account.deleteMail(id).subscribe(
      () => { },
      error => {
        console.log(this.errorReturn);
      },
      () => { this.getMail(); }
    );
  }

}
