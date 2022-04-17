import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../Models/categorie';
import { CommentDto } from '../../Models/comment-dto';
import { Forum } from '../../Models/Contents/forum';
import { HttpAccountService } from '../../Services/http-account.service';
import { HttpCommentService } from '../../Services/http-comment.service';
import { HttpForumService } from '../../Services/http-forum.service';
import { HttpPictureService } from '../../Services/http-picture.service';

@Component({
  selector: 'app-display-forum',
  templateUrl: './display-forum.component.html',
  styleUrls: ['./display-forum.component.css']
})
export class DisplayForumComponent implements OnInit {

  constructor(private http: HttpForumService, private serviceAccount: HttpAccountService,
    private serviceComment: HttpCommentService, private pictureService: HttpPictureService) { }

  public userId: number = 0;
  public roleUser: string = "";

  ngAfterContentChecked(): void {

    this.serviceAccount.idUser.subscribe((id) => { if (id != "") { this.userId = Number(id) } });
    this.serviceAccount.roleUser.subscribe((role) => { this.roleUser = role });

  }

  forums: Forum[] = [];
  comment: string = "";

  isEdit: boolean = false;
  editIndex: number = -1;
  forumIndex: number = -1;

  show(isEdit: boolean, editIndex: number, forumIndex: number) {
    if (forumIndex != this.forumIndex && this.isEdit == true) {
      this.editIndex = editIndex;
      this.forumIndex = forumIndex;
      return;
    }

    this.forumIndex = forumIndex;

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
        this.forums = date;
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
          this.forums = [];
          this.forums.push(data);
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
    this.forums[i].pictures.forEach(image => {
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
        this.forums.splice(i, 1);
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
