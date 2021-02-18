import {FlickrPhoto} from './flickr-photo';

export interface FlickrImageInfo {
  photo: {
    id: string;
    server: string;
    secret: string;
    url: string;
    title: {
      _content: string
    };
    description: {
      _content: string
    };
    owner: object;
    comments: string;
  };
}
