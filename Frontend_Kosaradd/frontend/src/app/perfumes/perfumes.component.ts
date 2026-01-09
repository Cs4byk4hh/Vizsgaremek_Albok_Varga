import { Component, OnInit } from '@angular/core';
import { PerfumeService } from '../services/perfumes.service';
import { Perfume } from './perfumes.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-perfumes',
  imports: [NgFor],
  templateUrl: './perfumes.component.html',
  styleUrls: ['./perfumes.component.css'],
  standalone: true,
})
export class PerfumesComponent implements OnInit {

  perfumes: Perfume[] = [];

  constructor(private perfumesService: PerfumeService) { }

  ngOnInit(): void {
    this.perfumesService.getPerfumes().subscribe({
      next: (data) => {
        this.perfumes = data;
      },
      error: (err) => {
        console.error('Hiba a parfümök lekérésekor', err);
      }
    });
  }
}