import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'searchComponent';
  values = [
    { value: 1, label: 'Empresa 1' },
    { value: 2, label: 'Empresa 2' },
    { value: 3, label: 'Empresa 3' },
    { value: 4, label: 'Empresa 4' },
    { value: 5, label: 'Empresa 5' },
    { value: 6, label: 'Empresa 6' },
    { value: 7, label: 'Empresa 7' },
    { value: 8, label: 'Empresa 8' },
    { value: 9, label: 'Empresa 9' },
    { value: 10, label: 'Empresa 10' },
  ]

  resposta(value) {
    console.log("Valor: " + value);

  }
}
