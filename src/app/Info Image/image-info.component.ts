import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-image-info',
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.css']
})
export class ImageInfoComponent implements OnInit {
  photoId;
  imageInfo;
  userPhotos;

  constructor(private route: ActivatedRoute, private router: Router, private flickrService: FlickrService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.photoId = id;
    this.flickrService.getInfo(this.photoId).subscribe(data => {
      this.imageInfo = data;
      this.flickrService.getUserPhotos(data.owner.nsid).subscribe(data1 => {
        this.userPhotos = data1;
      });
    });
  }

  displayInfo(id: string) {
    console.log(id);
    this.router.navigate(['/image', id]);
  }

}
