import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../Models/login';
import { HttpAccountService } from '../../Services/http-account.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  constructor(private http: HttpAccountService, private url: Router) { }

  ngOnInit(): void {}
  ErrorMessage: string = "";
  date: Login = new Login();

  Logging(): void {
    var sub = this.http.logging(this.date);
    this.ErrorMessage = "";
    var tmp = sub.subscribe(
      (data) => {

        this.http.tokenValue.next(`Bearer ${data.value}`);

        this.http.headers = new HttpHeaders({
          'Authorization': `Bearer ${data.value}`
        });

        tmp.unsubscribe();

        this.http.getUser();
        this.url.navigate(['/post']);

      },
      error => {
        console.log(error);
        this.ErrorMessage = "Nieprawidłowa dane logowania"
      },
      () => { }
    );
  }

  TestLogging() {
    this.date.email = "user@test.com";
    this.date.password = "test";
    this.Logging();

  }
}
