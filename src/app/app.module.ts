import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ImageCropperModule } from 'ngx-image-cropper';

import { LandingComponent } from './pages/landing/landing.component';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2ImgMaxModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
