import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kapcsolat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kapcsolat.component.html',
  styleUrl: './kapcsolat.component.css'
})
export class KapcsolatComponent {
  admins = [
    {name: 'Albók Csaba', email: 'albok.csaba.2021@osztalyterem.katolikuskeri.hu', phone: '+36 30 154 6597'},
    {name: 'Varga-Ádám Róbert', email: 'varga-adam.robert.2021@osztalyterem.kstolikuskeri.hu', phone: "+36 20 516 3035"}
  ];

}