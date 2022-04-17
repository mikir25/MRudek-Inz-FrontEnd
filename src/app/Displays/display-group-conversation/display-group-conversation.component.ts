import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Massages } from '../../Models/massages';
import { HttpAccountService } from '../../Services/http-account.service';
import { HttpGroupConversationService } from '../../Services/http-group-conversation.service';

@Component({
  selector: 'app-display-group-conversation',
  templateUrl: './display-group-conversation.component.html',
  styleUrls: ['./display-group-conversation.component.css']
})
export class DisplayGroupConversationComponent implements OnInit {


  errorReturn: any;
  ErrorMessage: string = "";
  GroupId: number = 0;
  messageNew: Massages = new Massages();
  messages: Massages[] = [];
  UserName: string = "";

  constructor(private account: HttpAccountService, private http: HttpGroupConversationService, private route: ActivatedRoute, private url: Router) { }

  ngOnInit(): void
  {
    

    var sub = this.route.paramMap.subscribe(
      (data) => {
        console.log("test" + data.get("id"));

        if (data.get("id")) {
          this.GroupId = Number(data.get("id"));
          this.getMassageGroup(this.GroupId);
        }
      },
      error => { console.log(error) },
      () => { sub.unsubscribe(); }
    );

    var subName = this.account.nameUser.subscribe(
      (name) => { this.UserName = name },
      error => { console.log(error) },
      () => { subName.unsubscribe(); }
    );


  }


  createMassage() {
    this.ErrorMessage = "";
    this.errorReturn = null;

    this.messageNew.userName = this.UserName;
    var sub = this.http.createMassage(this.messageNew, Number(this.GroupId)).subscribe(
      () => {},      
      error => {
        console.log(error);
        this.errorReturn = error.error;
        console.log(this.errorReturn);
        if (typeof this.errorReturn === 'string') {
          this.ErrorMessage = this.errorReturn;
        }
      },
      () => { sub.unsubscribe(); this.getMassageGroup(this.GroupId); }         
    );
  }

  getMassageGroup(id: number) {
    if (id != 0) {
      var sub = this.http.GetMassageGroup(id).subscribe(
        (data: Massages[]) => {
          this.messages = data;
        },
        error => { console.log(error) },
        () => { sub.unsubscribe(); }
      );
    }

  }
}
