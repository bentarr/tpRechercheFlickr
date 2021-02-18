import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRechercheComponent } from './image-recherche.component';

describe('SearchImagesComponent', () => {
  let component: ImageRechercheComponent;
  let fixture: ComponentFixture<ImageRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageRechercheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
