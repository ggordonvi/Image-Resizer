import { Component } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  image28x28: File;
  image56x56: File;
  image112x112: File;

  imagePreview28x28: string;
  imagePreview56x56: string;
  imagePreview112x112: string;

  fileUrl28: any;
  fileUrl56: any;
  fileUrl112: any;

  reader: FileReader = new FileReader();

  constructor(
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) { }

  resizeImage(event) {
    const image = event.target.files[0];
    this.ng2ImgMax.resizeImage(image, 28, 28).subscribe(
      result => {
        this.image28x28 = new File([result], result.name);
        const blob28 = new Blob([this.image28x28]);
        this.fileUrl28 = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob28));
        this.getImagePreview50(this.image28x28);
      },
      error => {
        console.log('Error 28x28', error);
      }
    );
    this.ng2ImgMax.resizeImage(image, 56, 56).subscribe(
      result => {
        this.image56x56 = new File([result], result.name);
        const blob56 = new Blob([this.image56x56]);
        this.fileUrl56 = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob56));
        this.getImagePreview150(this.image56x56);
      },
      error => {
        console.log('Error 56x56', error);
      }
    );
    this.ng2ImgMax.resizeImage(image, 112, 112).subscribe(
      result => {
        this.image112x112 = new File([result], result.name);
        const blob112 = new Blob([this.image112x112]);
        this.fileUrl112 = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob112));
        this.getImagePreview250(this.image112x112);
      },
      error => {
        console.log('Error 112x112', error);
      }
    );
  }

  getImagePreview50(file28: File) {
    this.reader.readAsDataURL(file28);
    this.reader.onload = () => {
      this.imagePreview28x28 = this.reader.result.toString();
    };
  }
  getImagePreview150(file56: File) {
    this.reader.readAsDataURL(file56);
    this.reader.onload = () => {
      this.imagePreview56x56 = this.reader.result.toString();
    };
  }
  getImagePreview250(file112: File) {
    this.reader.readAsDataURL(file112);
    this.reader.onload = () => {
      this.imagePreview112x112 = this.reader.result.toString();
    };
  }
}
