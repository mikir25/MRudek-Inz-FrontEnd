import { _Comment } from "../comment";
import { Picture } from "../Picture";

export class Tutorial {
  "id": number;
  "contents": string;
  "rating"?: number | null;
  "comments": Array<_Comment>;
  "pictures": Array<Picture>;
  "userId": number;
}
