import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from '../../Models/Contents/tutorial';
import { Picture } from '../../Models/Picture';
import { HttpPictureService } from '../../Services/http-picture.service';
import { HttpTutorialService } from '../../Services/http-tutorial.service';

@Component({
  selector: 'app-form-tutorial',
  templateUrl: './form-tutorial.component.html',
  styleUrls: ['./form-tutorial.component.css']
})
export class FormTutorialComponent implements OnInit {

  errorReturn: any;
  ErrorMessage: string = "";
  id: string | null = null;
  tutorial: Tutorial = new Tutorial();
  images: Picture[] = [];
  constructor(private http: HttpTutorialService, private route: ActivatedRoute, private url: Router, private pictureService: HttpPictureService) { }

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
        (data: Tutorial) => {
          this.tutorial = data;
          this.images = data.pictures;
        },
        error => { console.log(error) },
        () => { sub.unsubscribe(); }
      );
    }

  }

  choiceOptions() {
    this.ErrorMessage = "";
    this.errorReturn = null;

    if (this.id == null) {
      this.create();
    }
    else {
      this.edit();
    }

  }

  create() {

    var idTutorial: number;
    console.log(this.tutorial);
    var sub = this.http.create(this.tutorial).subscribe(
      (date) => {
        idTutorial = <number>date.id;
      },
      error => {
        console.log(error);
        this.errorReturn = error.error;
        if (typeof this.errorReturn === 'string') {
          this.ErrorMessage = this.errorReturn;
        }
      },
      async () => {
        sub.unsubscribe();

        for (var i = 0; i < this.images.length; i++) {
          this.images[i].tutorialId = idTutorial;
          await this.pictureService.create(this.images[i]).toPromise();
        }

        this.ErrorMessage = "";
        this.url.navigate(['/tutorial']);
      }
    );


  }

  edit() {
    var dataPicture: Picture[] = [];

    var subGet = this.http.getId(Number(this.id)).subscribe(
      (data: Tutorial) => {
        dataPicture = data.pictures;
      },
      error => { console.log(error) },
      () => { subGet.unsubscribe(); }
    );

    this.tutorial.id = Number(this.id);

    var sub = this.http.update(this.tutorial).subscribe(
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

        this.url.navigate(['/tutorial']);
      }
    );
  } 

}
