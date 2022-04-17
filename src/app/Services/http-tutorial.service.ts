import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from '../Models/comment-dto';
import { Tutorial } from '../Models/Contents/tutorial';
import { HttpAccountService } from './http-account.service';

@Injectable({
  providedIn: 'root'
})
export class HttpTutorialService {

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

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(this.url + "/Tutorial", { headers: this.headers });
  }

  getId(id: number): Observable<Tutorial> {
    return this.http.get<Tutorial>(this.url + `/Tutorial/${id}`, { headers: this.headers })
  }

  create(tutorial: Tutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(this.url + `/Tutorial`, tutorial, { headers: this.headers });
  }

  createComment(comment: CommentDto) {
    return this.http.post(this.url + `/Tutorial/Comment`, comment, { headers: this.headers });
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + `/Tutorial/${id}`, { headers: this.headers })
  }

  update(tutorial: Tutorial) {
    return this.http.put(this.url + `/api/Tutorial/${tutorial.id}`, tutorial, { headers: this.headers });
  }

}
