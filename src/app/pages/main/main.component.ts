import { Component } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  image: File[] = [];
  imagePreview: string[] = [];
  fileUrl: any[] = [];
  blob: any[] = [];

  imageChangedEvent: any = '';
  croppedImage: any = '';

  reader: FileReader = new FileReader();

  constructor(
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) { }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }


  resizeImage(event) {
    const image = event.target.files[0];
    this.ng2ImgMax.resizeImage(image, 28, 28).subscribe(
      result => {
        this.image[0] = new File([result], result.name);
        this.blob[0] = new Blob([this.image[0]]);
        this.fileUrl[0] = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.blob[0]));
        this.getImagePreview(this.image[0], 0);
      },
      error => {
        console.log('Error 28x28', error);
      }
    );
    this.ng2ImgMax.resizeImage(image, 56, 56).subscribe(
      result => {
        this.image[1] = new File([result], result.name);
        this.blob[1] = new Blob([this.image[1]]);
        this.fileUrl[1] = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.blob[1]));
        this.getImagePreview(this.image[1], 1);
      },
      error => {
        console.log('Error 56x56', error);
      }
    );
    this.ng2ImgMax.resizeImage(image, 112, 112).subscribe(
      result => {
        this.image[2] = new File([result], result.name);
        this.blob[2] = new Blob([this.image[2]]);
        this.fileUrl[2] = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.blob[2]));
        this.getImagePreview(this.image[2], 2);
      },
      error => {
        console.log('Error 112x112', error);
      }
    );
  }

  getImagePreview(file: File, num: number) {
    this.reader.readAsDataURL(file);
    this.reader.onload = () => {
      this.imagePreview[num] = this.reader.result.toString();
    };
  }

  checkForImage() {
    if (this.imagePreview[0] == null || this.imagePreview[1] == null || this.imagePreview[2] == null) {
      return false;
    } else {
      return true;
    }
  }
}
