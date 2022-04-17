import { Component, OnInit } from '@angular/core';
import { CommentDto } from '../../Models/comment-dto';
import { _Event } from '../../Models/Contents/event';
import { HttpAccountService } from '../../Services/http-account.service';
import { HttpCommentService } from '../../Services/http-comment.service';
import { HttpEventService } from '../../Services/http-event.service';
import { HttpPictureService } from '../../Services/http-picture.service';

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.css']
})
export class DisplayEventComponent implements OnInit {


  constructor(private http: HttpEventService, private serviceAccount: HttpAccountService,
    private serviceComment: HttpCommentService, private pictureService: HttpPictureService) { }

  public userId: number = 0;
  public roleUser: string = "";

  ngAfterContentChecked(): void {

    this.serviceAccount.idUser.subscribe((id) => { if (id != "") { this.userId = Number(id) } });
    this.serviceAccount.roleUser.subscribe((role) => { this.roleUser = role });

  }

  events: _Event[] = [];
  comment: string = "";

  isEdit: boolean = false;
  editIndex: number = -1;
  eventIndex: number = -1;

  show(isEdit: boolean, editIndex: number, eventIndex: number) {
    if (eventIndex != this.eventIndex && this.isEdit == true) {
      this.editIndex = editIndex;
      this.eventIndex = eventIndex;
      return;
    }

    this.eventIndex = eventIndex;

    if (this.editIndex == editIndex) {
      this.editIndex = -1
    }

    if (this.editIndex != -1 && this.isEdit == true) {
      this.editIndex = editIndex;
      return;
    }

    if (this.isEdit == false) {
      this.isEdit = true;
      this.editIndex = editIndex;
    }
    else {
      this.isEdit = false;
      this.editIndex = -1;
    }

  }

  ngOnInit(): void {
    this.getAll();

  }

  getAll() {
    this.http.getAll().subscribe(
      (date) => {
        this.events = date;
      },
      error => {
        console.log(error);
      },
      () => { }
    );
  }

  getId(id: number) {
    if (id != null || id == "") {
      this.http.getId(id).subscribe(
        (data) => {
          this.events = [];
          this.events.push(data);
        },
        error => {
          console.log(error);
        },
        () => { }
      );
    }
  }

  createComment(contents: string, id: number) {
    var comment: CommentDto = new CommentDto();
    comment.id = id;
    comment.contents = contents;

    this.http.createComment(comment).subscribe(
      (data) => { },
      error => {
        console.log(error);
      },
      () => { this.getAll(); }
    );
  }

  deletePicture(i: number) {
    this.events[i].pictures.forEach(image => {
      var sub = this.pictureService.delete(<number>image.id).subscribe(
        () => { },
        error => {
          console.log(error);
        },
        () => { sub.unsubscribe(); }
      );
    });
  }


  delete(id: number, i: number) {

    this.http.delete(id).subscribe(
      (data) => {
        this.deletePicture(i);
        this.events.splice(i, 1);
      },
      error => {
        console.log(error);
      },
      () => { }
    );

  }

  deleteComment(id: number) {
    this.serviceComment.delete(id).subscribe(
      () => {
        this.getAll();
      },
      error => {
        console.log(error);
      },
      () => { }
    );
  }

  updateComment(contents: string, id: number) {
    var comment: CommentDto = new CommentDto();
    comment.id = id;
    comment.contents = contents;

    this.serviceComment.update(comment).subscribe(
      () => {
        this.getAll();
      },
      error => {
        console.log(error);
      },
      () => {
        this.isEdit = false;
        this.getAll();
      }
    );
  }

}
