import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ButtonComponent } from './Button/button.component';
import { ImageRechercheComponent } from './Recherche Image/image-recherche.component';
import { FlickrService } from './services/flickr.service';
import { InfiniteScrollModule} from 'ngx-infinite-scroll';
import { ImageInfoComponent } from './Info Image/image-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: ImageRechercheComponent},
  { path: 'image/:id', component: ImageInfoComponent },
  { path: '**', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ImageRechercheComponent,
    ImageInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [FlickrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
