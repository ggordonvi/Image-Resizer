import { Component } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  image50x50: File;
  image150x150: File;
  image250x250: File;

  imagePreview50x50: string;
  imagePreview150x150: string;
  imagePreview250x250: string;

  reader: FileReader = new FileReader();

  constructor(
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) { }

  resizeImage(event) {
    const image = event.target.files[0];
    this.ng2ImgMax.resizeImage(image, 50, 50).subscribe(
      result => {
        this.image50x50 = new File([result], result.name);
        this.getImagePreview50(this.image50x50);
      },
      error => {
        console.log('Error 50x50', error);
      }
    );
    this.ng2ImgMax.resizeImage(image, 150, 150).subscribe(
      result => {
        this.image150x150 = new File([result], result.name);
        this.getImagePreview150(this.image150x150);
      },
      error => {
        console.log('Error 150x150', error);
      }
    );
    this.ng2ImgMax.resizeImage(image, 250, 250).subscribe(
      result => {
        this.image250x250 = new File([result], result.name);
        this.getImagePreview250(this.image250x250);
      },
      error => {
        console.log('Error 250x250', error);
      }
    );
  }

  getImagePreview50(file50: File) {
    this.reader.readAsDataURL(file50);
    this.reader.onload = () => {
      this.imagePreview50x50 = this.reader.result.toString();
    };
  }
  getImagePreview150(file150: File) {
    this.reader.readAsDataURL(file150);
    this.reader.onload = () => {
      this.imagePreview150x150 = this.reader.result.toString();
    };
  }
  getImagePreview250(file250: File) {
    this.reader.readAsDataURL(file250);
    this.reader.onload = () => {
      this.imagePreview250x250 = this.reader.result.toString();
    };
  }
}
