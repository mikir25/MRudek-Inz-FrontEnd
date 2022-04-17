import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GroupConversation } from '../Models/Conversation/group-conversation';
import { Friend } from '../Models/friend';
import { Token } from '../Models/http-token';
import { Login } from '../Models/login';
import { Mail } from '../Models/mail';
import { Register } from '../Models/register';
import { EditPassword } from '../Models/Users/edit-password';
import { EditUser } from '../Models/Users/edit-user';
import { User } from '../Models/Users/user';
import { UserDto } from '../Models/Users/user-dto';

@Injectable({
  providedIn: 'root'
})
export class HttpAccountService {


  public url: string = "https://inzbackend.azurewebsites.net/api";
  //public url: string = "https://localhost:44311/api";

  public headers: HttpHeaders;

  public tokenValue: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public nameUser: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public idUser: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public roleUser: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http: HttpClient, private urlNow: Router)
  {
    this.headers = new HttpHeaders();
  }

  logout() {
    this.nameUser.next("");
    this.idUser.next("");
    this.roleUser.next("");
    this.tokenValue.next("");

    this.headers = new HttpHeaders();
    this.urlNow.navigate(['/']);
  }

  logging(date: Login): Observable<Token> {
    return this.http.post<Token>(this.url + `/Account/login`, date);    
  }

  getGroup(): Observable<GroupConversation[]> {
    return this.http.get<GroupConversation[]>(this.url + `/Account/Groups`, { headers: this.headers });
  }

  getUser(): void {
    var sub = this.http.get<UserDto>(this.url + `/Account/UserDate`, { headers: this.headers });

    var tmp = sub.subscribe((result) => {
      this.idUser.next(result.id.toString());
      this.nameUser.next(result.name);
      this.roleUser.next(result.role);
      tmp.unsubscribe();
    });

  }

  GetUserByName(name: string): Observable<UserDto> {
    return this.http.get<UserDto>(this.url + `/Account/UserByName/${name}`, { headers: this.headers });
  }

  getFriend(): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.url + `/Account/Friends`, { headers: this.headers });
  }

  createFriend(friend: Friend) {
    return this.http.post(this.url + `/Account/Friend`, friend, { headers: this.headers });
  }

  deleteFriend(id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + `/Account/Friend/${id}`, { headers: this.headers })
  }

  getMail(): Observable<Mail[]> {
    return this.http.get<Mail[]>(this.url + `/Account/Mails`, { headers: this.headers });
  }

  createMail(mail: Mail) {
    return this.http.post(this.url + `/Account/Mail`, mail, { headers: this.headers });
  }

  deleteMail(id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + `/Account/Mail/${id}`, { headers: this.headers })
  }

  EditDateUser(editUser: EditUser) {
    return this.http.put(this.url + `/Account/EditDateUser`, editUser, { headers: this.headers });
  }

  EditPassword(editUser: EditPassword) {
    return this.http.put(this.url + `/Account/EditPassword`, editUser, { headers: this.headers });
  }
}
