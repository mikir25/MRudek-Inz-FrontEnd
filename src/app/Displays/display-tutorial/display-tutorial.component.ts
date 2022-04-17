import { Component, OnInit } from '@angular/core';
import { CommentDto } from '../../Models/comment-dto';
import { Tutorial } from '../../Models/Contents/tutorial';
import { HttpAccountService } from '../../Services/http-account.service';
import { HttpCommentService } from '../../Services/http-comment.service';
import { HttpPictureService } from '../../Services/http-picture.service';
import { HttpTutorialService } from '../../Services/http-tutorial.service';

@Component({
  selector: 'app-display-tutorial',
  templateUrl: './display-tutorial.component.html',
  styleUrls: ['./display-tutorial.component.css']
})
export class DisplayTutorialComponent implements OnInit {


  constructor(private http: HttpTutorialService, private serviceAccount: HttpAccountService,
    private serviceComment: HttpCommentService, private pictureService: HttpPictureService) { }

  public userId: number = 0;
  public roleUser: string = "";

  ngAfterContentChecked(): void {

    this.serviceAccount.idUser.subscribe((id) => { if (id != "") { this.userId = Number(id) } });
    this.serviceAccount.roleUser.subscribe((role) => { this.roleUser = role });

  }

  tutorials: Tutorial[] = [];
  comment: string = "";

  isEdit: boolean = false;
  editIndex: number = -1;
  tutorialIndex: number = -1;

  show(isEdit: boolean, editIndex: number, tutorialIndex: number) {
    if (tutorialIndex != this.tutorialIndex && this.isEdit == true) {
      this.editIndex = editIndex;
      this.tutorialIndex = tutorialIndex;
      return;
    }

    this.tutorialIndex = tutorialIndex;

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
        this.tutorials = date;
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
          this.tutorials = [];
          this.tutorials.push(data);
        },
        error => {
          console.log(error);
        },
        () => { }
      );
    }
  }

  createComment(contents: string, rating: number, id: number) {
    var comment: CommentDto = new CommentDto();
    comment.id = id;
    comment.contents = contents;
    comment.rating = rating;

    this.http.createComment(comment).subscribe(
      (data) => { },
      error => {
        console.log(error);
      },
      () => { this.getAll(); }
    );
  }

  deletePicture(i: number) {
    this.tutorials[i].pictures.forEach(image => {
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
        this.tutorials.splice(i, 1);
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

  updateComment(contents: string, rating: number, id: number) {
    var comment: CommentDto = new CommentDto();
    comment.id = id;
    comment.contents = contents;
    comment.rating = rating;

    this.serviceComment.update(comment).subscribe(
      () => {
        this.getAll();
      },
      error => {
        console.log(error);
      },
      () => {
        this.isEdit = false;
        this.getAll();}
    );
  }
}
