import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from '../Models/comment-dto';
import { _Event } from '../Models/Contents/event';
import { HttpAccountService } from './http-account.service';

@Injectable({
  providedIn: 'root'
})
export class HttpEventService {

  private url;
  public headers: HttpHeaders;
  constructor(private http: HttpClient, account: HttpAccountService) {
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

  getAll(): Observable<_Event[]> {
    return this.http.get<_Event[]>(this.url + "/Event", { headers: this.headers });
  }

  getId(id: number): Observable<_Event> {
    return this.http.get<_Event>(this.url + `/Event/${id}`, { headers: this.headers })
  }

  create(event: _Event): Observable<_Event> {
    return this.http.post<_Event>(this.url + `/Event`, event, { headers: this.headers });
  }

  createComment(comment: CommentDto) {
    return this.http.post(this.url + `/Event/Comment`, comment, { headers: this.headers });
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + `/Event/${id}`, { headers: this.headers })
  }

  update(event: _Event) {
    return this.http.put(this.url + `/Event/${event.id}`, event, { headers: this.headers });
  }

}
