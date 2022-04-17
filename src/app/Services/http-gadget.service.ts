import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from '../Models/comment-dto';
import { Gadget } from '../Models/Contents/gadget';
import { HttpAccountService } from './http-account.service';

@Injectable({
  providedIn: 'root'
})
export class HttpGadgetService {

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

  getAll(): Observable<Gadget[]> {
    return this.http.get<Gadget[]>(this.url + "/Gadget", { headers: this.headers });
  }

  getId(id: number): Observable<Gadget> {
    return this.http.get<Gadget>(this.url + `/Gadget/${id}`, { headers: this.headers })
  }

  create(gadget: Gadget): Observable<Gadget> {
    return this.http.post<Gadget>(this.url + `/Gadget`, gadget, { headers: this.headers });
  }

  createComment(comment: CommentDto) {
    return this.http.post(this.url + `/Gadget/Comment`, comment, { headers: this.headers });
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + `/Gadget/${id}`, { headers: this.headers })
  }

  update(gadget: Gadget) {
    return this.http.put(this.url + `/Gadget/${gadget.id}`, gadget, { headers: this.headers });
  }

}
