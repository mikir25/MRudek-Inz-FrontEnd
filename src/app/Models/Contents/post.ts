import { _Comment } from "../comment";
import { Picture } from "../Picture";

export class Post {
  "id": number;
  "contents": string;
  "comments": Array<_Comment>;
  "pictures": Array<Picture>;
  "userId": number;
}
