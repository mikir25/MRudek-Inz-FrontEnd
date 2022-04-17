import { Categorie } from "../categorie";
import { _Comment } from "../comment";
import { Picture } from "../Picture";

export class Forum {
  "id": number;
  "contents": string;
  "comments": Array<_Comment>;
  "pictures": Array<Picture>;
  "categorie": Categorie;
  "categorieId": number;
  "userId": number;
}
