import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from '../Models/comment-dto';
import { Post } from '../Models/Contents/post';
import { HttpAccountService } from './http-account.service';

@Injectable({
  providedIn: 'root'
})
export class HttpPostService {

  private url;
  public headers: HttpHeaders;
  constructor(private http: HttpClient, account: HttpAccountService)
  {
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

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url + "/Post", { headers: this.headers });
  }

  getId(id: number): Observable<Post> {
    return this.http.get<Post>(this.url + `/Post/${id}`, { headers: this.headers })
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url + `/Post`, post, { headers: this.headers });
  }

  createComment(comment: CommentDto) {
    return this.http.post(this.url + `/Post/Comment`, comment, { headers: this.headers });
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + `/Post/${id}`, { headers: this.headers })
  }

  update(post: Post) {
    return this.http.put(this.url + `/Post/${post.id}`, post, { headers: this.headers });

  }

}
