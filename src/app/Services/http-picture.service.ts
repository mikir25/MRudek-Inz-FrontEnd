import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Picture } from '../Models/Picture';
import { HttpAccountService } from './http-account.service';

@Injectable({
  providedIn: 'root'
})
export class HttpPictureService {

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

  create(picture: Picture) {
    return this.http.post(this.url + `/Picture`, picture, { headers: this.headers });
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + `/Picture/${id}`, { headers: this.headers })
  }
}
