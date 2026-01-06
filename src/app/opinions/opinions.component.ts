import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule, HttpClientModule, CommonModule],
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.css']
})
export class OpinionsComponent implements OnInit {
  myForm: FormGroup;
  submittedOpinions: {id: number, opinion: string, userName: string}[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.myForm = this.fb.group({
      opinion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOpinions();
  }

    loadOpinions() {
    this.http.get<{id: number, opinion: string, userName: string}[]>('http://localhost:3000/velemenyek')
      .subscribe(
        (data) => {
          this.submittedOpinions = data;
        },
        (error) => {
          console.error('Hiba a vélemények betöltésekor!', error);
        }
      );
  }

  

  kuldes() {
    if (this.myForm.valid) {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('Nincs bejelentkezve felhasználó!');
        return; 
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userName = payload.username;

      this.http.post('http://localhost:3000/velemenyek', {
        opinion: this.myForm.value.opinion,
        userName: userName
      })
      .subscribe(
        (response: any) => {
          console.log('Sikeres küldés!', response);
          this.loadOpinions();
          this.myForm.reset();
        },
        error => {
          console.log('Hiba történt a vélemény elküldése közben!', error);
        }
      );
    } else {
      console.log('A form nem érvényes!');
    }
  }

  deleteOpinion(id: number) {
    this.http.delete(`http://localhost:3000/velemenyek/${id}`).subscribe(
      () => {
        this.loadOpinions();
      },
      (error) => {
        console.log('Hiba a törlés során!', error);
      }
    );
  }

  editOpinion(index: number) {
    const currentOpinion = this.submittedOpinions[index];
    const updatedText = prompt('Szerkeszd a véleményt:', currentOpinion.opinion);

    if (updatedText !== null && updatedText.trim() !== '') {
      this.http.put(`http://localhost:3000/velemenyek/${currentOpinion.id}`, {
        opinion: updatedText
      }).subscribe(
        () => {
          this.loadOpinions();
        },
        (error) => {
          console.log('Hiba a szerkesztés során!', error);
        }
      );
    }
  }

  kijelentkezes() {
    this.http.post('http://localhost:3000/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe(response => {
      console.log(response);
      localStorage.removeItem('token');
      this.router.navigate(['/login']);      
    }, error => {
      console.log("Hiba a kijelentkezés során!", error);
    });
  }
}
