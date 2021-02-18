import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../services/flickr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-images',
  templateUrl: './image-recherche.component.html',
  styleUrls: ['./image-recherche.component.css']
})
export class ImageRechercheComponent implements OnInit {
  images = [];
  keyword: string;

  constructor(private flickrService: FlickrService, private router: Router) { }

  ngOnInit(): void {
  }

  search(keyword: string) {
    this.keyword = keyword.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.imageSearch(this.keyword).subscribe(data => {
        this.images = data;
      });
    }
  }

  onScroll(): void {
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.imageSearch(this.keyword).subscribe(data => {
        this.images = this.images.concat(data);
      });
    }
  }

  displayInfo(id: string) {
    this.router.navigate(['/image', id]);
  }
}
