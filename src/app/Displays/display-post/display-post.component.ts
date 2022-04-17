import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { _Comment } from '../../Models/comment';
import { CommentDto } from '../../Models/comment-dto';
import { Post } from '../../Models/Contents/post';
import { Picture } from '../../Models/Picture';
import { HttpAccountService } from '../../Services/http-account.service';
import { HttpCommentService } from '../../Services/http-comment.service';
import { HttpPictureService } from '../../Services/http-picture.service';
import { HttpPostService } from '../../Services/http-post.service';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent implements OnInit {

  constructor(private http: HttpPostService, private serviceAccount: HttpAccountService,
    private serviceComment: HttpCommentService, private pictureService: HttpPictureService) { }

  public userId: number = 0;
  public roleUser: string = "";

  ngAfterContentChecked(): void {

    this.serviceAccount.idUser.subscribe((id) => { if (id != "") { this.userId = Number(id) } });
    this.serviceAccount.roleUser.subscribe((role) => { this.roleUser = role });

  }

  posts: Post[] = [];
  comment: string = "";

  isEdit: boolean = false;
  editIndex: number = -1;
  postIndex: number = -1;

  show(isEdit: boolean, editIndex: number, postIndex: number)
  {
    if (postIndex != this.postIndex && this.isEdit == true) {
      this.editIndex = editIndex;
      this.postIndex = postIndex;
      return;
    }

    this.postIndex = postIndex;

    if (this.editIndex == editIndex) {
      this.editIndex = -1}

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
        this.posts = date;
      },
      error => {
        console.log(error);
      },
      () => {}
    );
  }

  getId(id: number) {
    if (id != null || id == "") {
      this.http.getId(id).subscribe(
        (data) => {
          this.posts = [];
          this.posts.push(data);
        },
        error => {
          console.log(error);
        },
        () => {}
      );
    }
  }

  createComment(contents: string, id: number) {
    var comment: CommentDto = new CommentDto();
    comment.id = id;
    comment.contents = contents;

    this.http.createComment(comment).subscribe(
      (data) => {},
      error => {
        console.log(error);
      },
      () => { this.getAll(); }
    );
  }

  deletePicture(i: number)
  {
    this.posts[i].pictures.forEach(image => {
      var sub = this.pictureService.delete(<number>image.id).subscribe(
        () => {},
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
        this.posts.splice(i, 1);
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
      () => {},
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
