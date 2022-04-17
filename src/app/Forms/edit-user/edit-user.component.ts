import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditUser } from '../../Models/Users/edit-user';
import { EditPassword } from '../../Models/Users/edit-password';
import { HttpAccountService } from '../../Services/http-account.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private http: HttpAccountService, private url: Router) { }
  errorReturn: any;
  ErrorMessageUser: string = "";
  ErrorMessagePassword: string = "";
  editUser: EditUser = new EditUser();
  editPassword: EditPassword = new EditPassword();
  userId: number = 0;

  ngOnInit(): void
  {
    var sub = this.http.idUser.subscribe((date) => { this.userId = Number(date); });
    sub.unsubscribe();
  }


  EditDateUser() {
    this.ErrorMessageUser = "";
    this.ErrorMessagePassword = "";
    this.errorReturn = null;
    this.editUser.userId = this.userId;
    
    console.log(this.editUser);

    var sub = this.http.EditDateUser(this.editUser).subscribe(
      () => { },
      error => {
        console.log(error);
        this.errorReturn = error.error;

        if (typeof this.errorReturn === 'string') {
          this.ErrorMessageUser = this.errorReturn;
        } else if (error.error.errors.Email = 'That email is taken' && this.editUser.email != '' && this.editUser.email != null) {
          this.ErrorMessageUser = "Email jest zajęty";
        } else if (error.error.errors.Nick = 'That nick is taken' && this.editUser.name != '' && this.editUser.name != null) {
          this.ErrorMessageUser = "Nazwa użytkownika jest zajęty";
        } else {
          this.ErrorMessageUser = "Błędne dane";
        }

      },
      () => { sub.unsubscribe(); this.ErrorMessageUser = ""; this.url.navigate(['/']); this.http.logout(); }
    );
    
  }
  
  EditPassword() {
    this.ErrorMessageUser = "";
    this.ErrorMessagePassword = "";
    this.errorReturn = null;
    this.editPassword.userId = this.userId;
    
    var sub = this.http.EditPassword(this.editPassword).subscribe(
      () => { },
      error => {
        console.log(error);
        this.errorReturn = error.error;

        if (this.errorReturn == 'Invalid password') {
          this.ErrorMessagePassword = "Nie poprawne stare hasło";
        } else if (error.error.errors.ConfirmPassword[0] != null && error.error.errors.PasswordLast == null && error.error.errors.Password == null) {
          this.ErrorMessagePassword = "Wpisałęś dwa różne hasła";
        } else {
          this.ErrorMessagePassword = "Wypełnij wszystkie pola. Hasło musi mieć długość co najmniej 6 znaków";
        }
      },
      () => { sub.unsubscribe(); this.ErrorMessagePassword = ""; this.url.navigate(['/']); this.http.logout(); }
    );
    
  }
}
