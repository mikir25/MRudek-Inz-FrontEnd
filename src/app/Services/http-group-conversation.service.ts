import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupConversation } from '../Models/Conversation/group-conversation';
import { Massages } from '../Models/massages';
import { UserDto } from '../Models/Users/user-dto';
import { HttpAccountService } from './http-account.service';

@Injectable({
  providedIn: 'root'
})
export class HttpGroupConversationService {

  private url;
  public headers: HttpHeaders;
  constructor(private http: HttpClient, private account: HttpAccountService) {
    this.url = account.url;
    this.headers = new HttpHeaders();

    account.tokenValue.subscribe(
      (token) => {
        this.headers = new HttpHeaders({
          'Authorization': token
        });
      }
    );
  }

  getAllGroup(): Observable<GroupConversation[]> {
    return this.http.get<GroupConversation[]>(this.url + `/Group`, { headers: this.headers });
  }

  AddUserGroup(groupId: number) {
    return this.http.post(this.url + `/Group/AddUser/${groupId}`, null, { headers: this.headers });
  }

  createMassage(message: Massages, groupId: number) {
    return this.http.post(this.url + `/Group/Message/${groupId}`, message, { headers: this.headers });
  }

  create(group: GroupConversation) {
    return this.http.post(this.url + `/Group`, group, { headers: this.headers });
  }

  DeleteUserInGroup(id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + `/Group/${id}`, { headers: this.headers })
  }

  GetUsersGroup(id: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.url + `/Group/Users/${id}`, { headers: this.headers });
  }

  GetMassageGroup(id: number): Observable<Massages[]> {
    return this.http.get<Massages[]>(this.url + `/Group/Messages/${id}`, { headers: this.headers });
  }
}
