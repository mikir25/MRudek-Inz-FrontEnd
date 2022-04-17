import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../Models/categorie';
import { CommentDto } from '../Models/comment-dto';
import { Forum } from '../Models/Contents/forum';
import { HttpAccountService } from './http-account.service';

@Injectable({
  providedIn: 'root'
})
export class HttpForumService {

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

  getAll(): Observable<Forum[]> {
    return this.http.get<Forum[]>(this.url + "/Forum", { headers: this.headers });
  }

  GetAllCategorie(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.url + "/Forum/Categories");
  }

  getId(id: number): Observable<Forum> {
    return this.http.get<Forum>(this.url + `/Forum/${id}`, { headers: this.headers })
  }

  create(forum: Forum): Observable<Forum> {
    return this.http.post<Forum>(this.url + `/Forum`, forum, { headers: this.headers });
  }

  createComment(comment: CommentDto) {
    return this.http.post(this.url + `/Forum/Comment`, comment, { headers: this.headers });
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + `/Forum/${id}`, { headers: this.headers })
  }

  update(forum: Forum) {
    return this.http.put(this.url + `/Forum/${forum.id}`, forum, { headers: this.headers });

  }

}
