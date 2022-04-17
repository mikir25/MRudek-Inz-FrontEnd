import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { _Event } from '../../Models/Contents/event';
import { Picture } from '../../Models/Picture';
import { HttpEventService } from '../../Services/http-event.service';
import { HttpPictureService } from '../../Services/http-picture.service';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.css']
})
export class FormEventComponent implements OnInit {

  errorReturn: any;
  ErrorMessage: string = "";
  id: string | null = null;
  event: _Event = new _Event();
  images: Picture[] = [];
  constructor(private http: HttpEventService, private route: ActivatedRoute, private url: Router, private pictureService: HttpPictureService) { }

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
        (data: _Event) => {
          this.event = data;
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
    console.log(this.event.dateOfEvent);
    var idEvent: number;
    var sub = this.http.create(this.event).subscribe(
      (date) => {
        idEvent = <number>date.id;
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
          this.images[i].eventId = idEvent;
          await this.pictureService.create(this.images[i]).toPromise();
        }

        this.ErrorMessage = "";
        this.url.navigate(['/event']);
      }
    );


  }

  edit() {
    var dataPicture: Picture[] = [];

    var subGet = this.http.getId(Number(this.id)).subscribe(
      (data: _Event) => {
        dataPicture = data.pictures;
      },
      error => { console.log(error) },
      () => { subGet.unsubscribe(); }
    );

    this.event.id = Number(this.id);

    var sub = this.http.update(this.event).subscribe(
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

        this.url.navigate(['/event']);
      }
    );
  } 

}
