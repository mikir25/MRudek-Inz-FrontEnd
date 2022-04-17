import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../../Models/login';
import { Register } from '../../Models/register';
import { HttpAccountService } from '../../Services/http-account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private http: HttpAccountService, private route: ActivatedRoute, private url: Router, private client: HttpClient) { }

  ErrorMessage: string = "";
  register: Register = new Register();

  ngOnInit(): void {
  }

  Register() {

    var errorReturn = null;
    var ErrorMessage: string = "";

    var sub = this.client.post(this.http.url + `/Account/register`, this.register);
    var tmp = sub.subscribe(
      (data) => { },
      error => {

        errorReturn = error.error.errors;
        console.log(error);

        if (errorReturn.Name != null) {
          ErrorMessage = ErrorMessage + " " + errorReturn.Name;
        }

        if (errorReturn.Email != null) {
          ErrorMessage = ErrorMessage + " " + errorReturn.Email;
        }

        if (errorReturn.Password[0] != null) {
          ErrorMessage = ErrorMessage + " " + errorReturn.Password[0];
        }

        if (errorReturn.Password[1] != null) {
          ErrorMessage = ErrorMessage + " " + errorReturn.Password[1];
        }

        if (errorReturn.ConfirmPassword[0] != null) {
          ErrorMessage = ErrorMessage + " " + errorReturn.ConfirmPassword[0];
        }

        if (errorReturn.ConfirmPassword[1] != null) {
          ErrorMessage = ErrorMessage + " " + errorReturn.ConfirmPassword[1];
        }

        console.log(ErrorMessage);
        this.ErrorMessage = ErrorMessage;
      },
      () => {
        var user: Login = new Login();
        user.email = this.register.email;
        user.password = this.register.password;

        this.http.logging(user);
        tmp.unsubscribe();
        this.url.navigate(['/post']);

      }
    );
  }
}
