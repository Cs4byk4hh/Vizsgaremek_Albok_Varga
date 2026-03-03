import { Component, ViewEncapsulation } from '@angular/core';
import { NgFor } from '@angular/common';

interface Slide {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NgFor],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  currentIndex = 0;

  slides: Slide[] = [
    { src: 'assets/images/eros.jpg', alt: 'Carousel 1' },
    { src: 'assets/images/flame.jpg', alt: 'Carousel 2' },
    { src: 'assets/images/erosenergy.jpg', alt: 'Carousel 3' },
    { src: 'assets/images/valentino.jpg', alt: 'Carousel 4' }
  ];

  prevSlide() {
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
  }

  nextSlide() {
    this.currentIndex = this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}