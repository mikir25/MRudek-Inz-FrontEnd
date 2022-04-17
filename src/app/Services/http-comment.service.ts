import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from '../Models/comment-dto';
import { HttpAccountService } from './http-account.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCommentService {

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

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + `/Comment/${id}`, { headers: this.headers })
  }

  update(comment: CommentDto) {
    return this.http.put(this.url + `/Comment/${comment.id}`, comment, { headers: this.headers });

  }

}
