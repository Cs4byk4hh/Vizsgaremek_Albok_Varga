import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule, CommonModule],
  styleUrls: ['./opinions.component.css']
})
export class OpinionsComponent implements OnInit {
  myForm: FormGroup;
  submittedOpinions: {id: number, opinion: string, username: string}[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.myForm = this.fb.group({
      opinion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOpinions();
  }

  loadOpinions() {
  const token = localStorage.getItem('token');
  this.http.get<{id: number, opinion: string, username: string}[]>('http://localhost:3000/velemenyek', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .subscribe(
    (data) => {
      this.submittedOpinions = data;
    },
    (error) => {
      console.error('Hiba a vélemények betöltésekor!', error);
      this.snackBar.open(`Hiba a vélemények betöltésekor: ${error.status}`, 'Bezár', { duration: 3000 });
    }
  );
}


  kuldes() {
  if (this.myForm.valid) {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('Nincs bejelentkezve felhasználó!');
      this.snackBar.open('Be kell jelentkezni a vélemény küldéséhez!', 'Bezár', { duration: 3000 });
      return; 
    }

    this.http.post(
      'http://localhost:3000/velemenyek',
      { opinion: this.myForm.value.opinion },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    .subscribe(
      () => {
        this.loadOpinions();
        this.myForm.reset();
        this.snackBar.open('Vélemény sikeresen elküldve!', 'Bezár', { duration: 3000 });
      },
      error => {
        console.log('Hiba történt a vélemény elküldése közben!', error);
        this.snackBar.open('Hiba történt a vélemény küldése közben!', 'Bezár', { duration: 3000 });
      }
    );
  } else {
    console.log('A form nem érvényes!');
    this.snackBar.open('A form nem érvényes!', 'Bezár', { duration: 3000 });
  }
}



 deleteOpinion(id: number) {
  const token = localStorage.getItem('token');
  if (!token) {
    this.snackBar.open('Be kell jelentkezni a vélemény törléséhez!', 'Bezár', { duration: 3000 });
    return;
  }

  this.http.delete(`http://localhost:3000/velemenyek/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).subscribe(
    () => {
      this.loadOpinions();
      this.snackBar.open('Vélemény sikeresen törölve!', 'Bezár', { duration: 3000 });
    },
    (error) => {
      console.log('Hiba a törlés során!', error);
      this.snackBar.open('Hiba történt a vélemény törlése során!', 'Bezár', { duration: 3000 });
    }
  );
}


 editOpinion(index: number) {
  const currentOpinion = this.submittedOpinions[index];
  const updatedText = prompt('Szerkeszd a véleményt:', currentOpinion.opinion);
  const token = localStorage.getItem('token');

  if (!token) {
    this.snackBar.open('Be kell jelentkezni a vélemény szerkesztéséhez!', 'Bezár', { duration: 3000 });
    return;
  }

  if (updatedText !== null && updatedText.trim() !== '') {
    this.http.put(`http://localhost:3000/velemenyek/${currentOpinion.id}`,
      { opinion: updatedText },
      { headers: { 'Authorization': `Bearer ${token}` } }
    ).subscribe(
      () => {
        this.loadOpinions();
        this.snackBar.open('Vélemény sikeresen frissítve!', 'Bezár', { duration: 3000 });
      },
      (error) => {
        console.log('Hiba a szerkesztés során!', error);
        this.snackBar.open('Hiba történt a vélemény frissítésekor!', 'Bezár', { duration: 3000 });
      }
    );
  } else if (updatedText !== null) {
    this.snackBar.open('A vélemény nem lehet üres!', 'Bezár', { duration: 3000 });
  }
}


  kijelentkezes() {
    this.http.post('http://localhost:3000/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe(response => {
      this.snackBar.open('Sikeres kijelenkezés!', 'Bezár', {duration: 3000});
      console.log(response);
      localStorage.removeItem('token');
      this.router.navigate(['/login']);      
    }, error => {
      console.log("Hiba a kijelentkezés során!", error);
      this.snackBar.open('Hiba a kijelentkezés során!', 'Bezár', {duration: 3000});
    });
  }
}