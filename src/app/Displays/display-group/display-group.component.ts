import { Component, OnInit } from '@angular/core';
import { GroupConversation } from '../../Models/Conversation/group-conversation';
import { HttpAccountService } from '../../Services/http-account.service';
import { HttpGroupConversationService } from '../../Services/http-group-conversation.service';

@Component({
  selector: 'app-display-group',
  templateUrl: './display-group.component.html',
  styleUrls: ['./display-group.component.css']
})
export class DisplayGroupComponent implements OnInit {

  errorReturn: any;
  ErrorMessage: string = "";
  groupNew: GroupConversation = new GroupConversation;
  groups: GroupConversation[] = [];
  groupsAll: GroupConversation[] = [];
  constructor(private account: HttpAccountService, private serviceGroup: HttpGroupConversationService) { }

  ngOnInit(): void {
    this.getGroup();
    this.getAllGroup();
  }

  getAllGroup() {
    var sub = this.serviceGroup.getAllGroup().subscribe(
      (date) => { this.groupsAll = date },
      error => {
        console.log(error);
      },
      () => { sub.unsubscribe(); this.groupsAll.sort();  }
    );
  }

  AddUserGroup(groupId: number) {
    this.ErrorMessage = "";
    this.errorReturn = null;

    var sub = this.serviceGroup.AddUserGroup(groupId).subscribe(
      () => { },
      error => {
        console.log(error);
        this.errorReturn = error.error;
        console.log(this.errorReturn);
        if (typeof this.errorReturn === 'string') {
          this.ErrorMessage = this.errorReturn;
        }
      },
      () => { this.ErrorMessage = ""; this.getGroup(); this.getAllGroup(); sub.unsubscribe(); }
    );
  }

  getGroup()
  {
    var sub = this.account.getGroup().subscribe(
      (date) => { this.groups = date },
      error => {
        console.log(error);
      },
      () => { sub.unsubscribe(); }
    );   
  }

  deleteUserInGroup(idGroup: number)
  {
    this.ErrorMessage = "";
    this.errorReturn = null;

    var sub = this.serviceGroup.DeleteUserInGroup(idGroup).subscribe(
      () => { },
      error => {
        console.log(error);
        this.errorReturn = error.error;
        console.log(this.errorReturn);
        if (typeof this.errorReturn === 'string') {
          this.ErrorMessage = this.errorReturn;
        }
      },
      () => { this.ErrorMessage = ""; this.getGroup(); this.getAllGroup(); sub.unsubscribe(); }
    );
  }

  CreateGroup()
  {
    this.ErrorMessage = "";
    this.errorReturn = null;

    var sub = this.serviceGroup.create(this.groupNew).subscribe(
      () => { },
      error => {
        console.log(error);
        this.errorReturn = error.error;
        console.log(this.errorReturn);
        if (typeof this.errorReturn === 'string') {
          this.ErrorMessage = this.errorReturn;
        }
      },
      () => { this.ErrorMessage = ""; this.getGroup(); this.getAllGroup(); sub.unsubscribe(); }
    );
  }
}
