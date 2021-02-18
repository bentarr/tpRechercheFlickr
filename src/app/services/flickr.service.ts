import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FlickrOutput } from '../interfaces/flickr-output';
import { FlickrPhoto } from '../interfaces/flickr-photo';
import {Observable} from 'rxjs';
import {FlickrImageInfo} from '../interfaces/flickr-image-info';
import { HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FlickrService {
  lastkeyword: string;
  currentPage = 1;
  urlServer = 'http://localhost:7000/server/projet';
  listeDonnees: Object = [];

  constructor(private http: HttpClient) { }

  getData(keyword1: string) {
    return this.http
      .get(`http://localhost:7000/server/photos/${keyword1}`);
  }
  setData(keyword1: string, keyword2: string) {
    return this.http
      .get(`http://localhost:7000/server/photos/${keyword1}/${keyword2}`);
  }

  imageSearch(keyword: string): Observable<any> {
    if (this.lastkeyword === keyword) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
    this.lastkeyword = keyword;
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=16&page=${this.currentPage}`;

    this.getData(keyword).subscribe(data => {
      this.listeDonnees = data;
    });
    if (typeof( this.listeDonnees[0]) === 'undefined') {
      console.log("Donnée inexistante");
      this.http.post<any>('http://localhost:7000/server/photos/', { name: keyword, lien: url + params }).subscribe(data => {
      });
    return this.getPhotos(url + params);
  }
  else {
    console.log("Donnée existante");
    return this.getPhotos(this.listeDonnees[0].lien);
  }
}

  getInfo(photoId: string): Observable<any> {
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&';
    const params = `api_key=${environment.flickr.key}&photo_id=${photoId}&format=json&nojsoncallback=1`;

    return this.http.get(url + params).pipe(map((res: FlickrImageInfo) => {
      const imageInfo = res.photo;
      const photo = {
        id: imageInfo.id,
        url: `https://live.staticflickr.com/${imageInfo.server}/${imageInfo.id}_${imageInfo.secret}.jpg`,
        title: imageInfo.title._content,
        description: imageInfo.description._content,
        owner: imageInfo.owner,
        comments: imageInfo.comments
      };
      return photo;
    }));
  }

  getUserPhotos(userId: string): Observable<any> {
    const randomPage = Math.floor((Math.random() * 10) + 1);
    console.log(randomPage);
    const url = 'https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&';
    const params = `api_key=${environment.flickr.key}&user_id=${userId}&per_page=4&page=${randomPage}&format=json&nojsoncallback=1`;

    return this.getPhotos(url + params);
  }

  getPhotos(url: string): Observable<any> {
    console.log(url);
    return this.http.get(url).pipe(map((res: FlickrOutput) => {
      const urlArray = [];
      console.log(res);
      res.photos.photo.forEach((photo: FlickrPhoto) => {
        const imageObject = {
          id: `${photo.id}`,
          url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
          title: photo.title
        };
        urlArray.push(imageObject);
      });
      return urlArray;
    }));
  }

  getFlickrImg(name: string): Observable<any> {
    let apiUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';

    name = name.match(/[a-zA-Z0-9]+/)[0];
    return this.http.get(this.urlServer + "/" + name.toLowerCase()).pipe(
      mergeMap(
        (result) => {
          if (Object.keys(result).length === 0) {
            return this.http.get(apiUrl)
              .pipe(
                mergeMap(
                  (getResult: any) => {
                    this.http.post(this.urlServer, { 
                      "name": getResult.listeDonnees,
                      "lien": getResult.listeDonnees
                    },).subscribe();
                    return of(getResult);
                  }
                )
              );
          } else {
            return of(result[0]);
          }
        }
      )
    );
  }


}