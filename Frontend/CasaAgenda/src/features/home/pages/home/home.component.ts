import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink],
})
export class HomeComponent {
  // Se arma a mano en vez de usar el pipe date con locale es-AR,
  // que necesita registrar los datos de locale en el arranque.
  private readonly dias = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  private readonly meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  readonly fechaDeHoy = this.formatearHoy();

  private formatearHoy(): string {
    const hoy = new Date();
    return `${this.dias[hoy.getDay()]} ${hoy.getDate()} de ${this.meses[hoy.getMonth()]}`;
  }
}
