import { _Comment } from "../comment";
import { Picture } from "../Picture";

export class Gadget {
  "id": number;
  "contents": string;
  "comments": Array<_Comment>;
  "pictures": Array<Picture>;
  "userId": number;
}
