import { _Comment } from "../comment";
import { Picture } from "../Picture";

export class _Event {
  "id": number;
  "contents": string;
  "dateOfEvent": string;
  "placeOfEvent": string;
  "comments": Array<_Comment>;
  "pictures": Array<Picture>;
  "userId": number;
}
