import { Component } from '@angular/core';
import { Partido } from '../../models/partido';
import { PartidoService } from '../../services/partidos/partido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent {
  partidos: Partido[] = [];
  mensajeError: string | null = null;

  constructor(
    private partidoService: PartidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerPartidos();
  }

  obtenerPartidos(): void {
    this.mensajeError = null;

    this.partidoService.getPartidos().subscribe(
      response => {
        this.partidos = response;
      },
      error => {
        console.error('Error al obtener equipos:', error);
        this.mensajeError = 'Error al obtener los equipos. Por favor, inténtelo de nuevo más tarde.';
      }
    );
  }

  eliminarPartido(idPartido: number): void {
    this.partidoService.eliminarPartido(idPartido).subscribe(
      response => {
        console.log(idPartido);
        console.log('Partido eliminado:', response);
        this.obtenerPartidos(); // Actualiza la lista de equipos después de eliminar uno
      },
      error => {
        console.error('Error al eliminar partido:', error);
        this.mensajeError = 'Error al eliminar el partido. Por favor, inténtelo de nuevo más tarde.';
      }
    );
  }

}
