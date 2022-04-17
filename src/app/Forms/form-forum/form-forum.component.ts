import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../../Models/categorie';
import { Forum } from '../../Models/Contents/forum';
import { Picture } from '../../Models/Picture';
import { HttpForumService } from '../../Services/http-forum.service';
import { HttpPictureService } from '../../Services/http-picture.service';

@Component({
  selector: 'app-form-forum',
  templateUrl: './form-forum.component.html',
  styleUrls: ['./form-forum.component.css']
})
export class FormForumComponent implements OnInit {

  categorieId: number = 0;
  errorReturn: any;
  ErrorMessage: string = "";
  id: string | null = null;
  forum: Forum = new Forum();
  images: Picture[] = [];
  categories: Categorie[] = [];

  constructor(private http: HttpForumService, private route: ActivatedRoute, private url: Router, private pictureService: HttpPictureService) { }

  selectImages(event: any) {
    this.ErrorMessage = "";
    this.errorReturn = null;

    var images = event.target.files;

    if (this.images.length + images.length > 4) {
      this.ErrorMessage = "Maksymalna ilość zdjęć na post to 4";
      return;
    }

    for (let i = 0; i < images.length; i++) {
      if (images[i].type.match(/image\/*/) != null) {
        this.readerImage(images[i]);
      }

    }

  }

  deleteImage(index: number) {
    this.images.splice(index, 1);
  }

  readerImage(image: File) {

    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = (_event) => {

      var result = reader.result;

      if (result != null) {
        this.images.push({ name: image.name, picture: result.toString() });
      }

    }

  }

  ngOnInit(): void {

    var sub = this.route.paramMap.subscribe(
      (data) => {
        if (data.get("id")) {
          this.id = data.get("id");
        }
      },
      error => { console.log(error) },
      () => { sub.unsubscribe(); }
    );

    if (this.id) {
      var sub = this.http.getId(Number(this.id)).subscribe(
        (data: Forum) => {
          this.forum = data;
          this.images = data.pictures;
        },
        error => { console.log(error) },
        () => { sub.unsubscribe(); }
      );
    }


    this.http.GetAllCategorie().subscribe(
      (date) => {
        this.categories = date;
      },
      error => {
        console.log(error);
      },
      () => { }
    );

  }

  choiceOptions() {
    console.log(this.categories);

    this.ErrorMessage = "";
    this.errorReturn = null;

    if (this.categorieId != 0) {
      this.forum.categorieId = this.categorieId;

      if (this.id == null) {
        this.create();
      }
      else {
        this.edit();
      }

    } else {
      this.ErrorMessage = "Wybierz kategorie";

    }


  }

  create() {

    var idForum: number;
    var sub = this.http.create(this.forum).subscribe(
      (date) => {
        idForum = <number>date.id;
      },
      error => {
        console.log(error);
        this.errorReturn = error.error;
        console.log(this.errorReturn);
        if (typeof this.errorReturn === 'string') {
          this.ErrorMessage = this.errorReturn;
        }
      },
      async () => {
        sub.unsubscribe();

        for (var i = 0; i < this.images.length; i++) {
          this.images[i].forumId = idForum;
          await this.pictureService.create(this.images[i]).toPromise();
        }

        this.ErrorMessage = "";
        this.url.navigate(['/forum']);
      }
    );


  }

  edit() {
    var dataPicture: Picture[] = [];

    var subGet = this.http.getId(Number(this.id)).subscribe(
      (data: Forum) => {
        dataPicture = data.pictures;
      },
      error => { console.log(error) },
      () => { subGet.unsubscribe(); }
    );

    this.forum.id = Number(this.id);

    var sub = this.http.update(this.forum).subscribe(
      () => { },
      error => {
        console.log(error);
        this.errorReturn = error.error;
        if (typeof this.errorReturn === 'string') {
          this.ErrorMessage = this.errorReturn;
        }
      },
      async () => {
        sub.unsubscribe();
        this.ErrorMessage = "";


        for (var j = 0; j < dataPicture.length; j++) {
          var isPicture: boolean = false;

          for (var p = 0; p < this.images.length; p++) {
            if (dataPicture[j].id == this.images[p].id) {
              isPicture = true;
              break;
            }
          }

          if (isPicture == false) {
            await this.pictureService.delete(<number>dataPicture[j].id).toPromise();
          }

        }

        this.url.navigate(['/forum']);
      }
    );
  } 

}
