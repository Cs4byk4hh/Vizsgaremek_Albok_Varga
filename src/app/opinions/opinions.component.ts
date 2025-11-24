import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatDividerModule, MatButtonModule, HttpClientModule, CommonModule],
  templateUrl: './opinions.component.html',
  styleUrl: './opinions.component.css'
})
export class OpinionsComponent {
   myForm: FormGroup;
  submittedOpinion: string | null = null;
  submittedUser: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      opinion: ['', Validators.required] 
    });
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

        console.log('Küldött userName:', userName);

        this.http.post('http://localhost:3000/velemenyek', {
            opinion: this.myForm.value.opinion,
            userName: userName 
        })
        .subscribe(
            response => {
                console.log('Sikeres küldés!', response);
                this.submittedOpinion = this.myForm.value.opinion;
                this.submittedUser = userName;
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
}
