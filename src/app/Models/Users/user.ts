import { Friend } from "../friend";
import { Mail } from "../mail";
import { UserDto } from "./user-dto";

export class User {

  "id": number;
  "name": string;
  "email": string;
  "role": string;

  "usersGroup": Array<UserDto>;
  "mails": Array<Mail>;
  "friends": Array<Friend>;

}
