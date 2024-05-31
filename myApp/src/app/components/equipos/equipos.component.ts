import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../models/equipo';
import { EquiposService } from '../../services/equipos/equipos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  equipos: Equipo[] = [];
  mensajeError: string | null = null;

  constructor(
    private equiposService: EquiposService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerEquipos();
  }

  obtenerEquipos(): void {
    this.mensajeError = null;

    this.equiposService.getEquipos().subscribe(
      response => {
        this.equipos = response;
      },
      error => {
        console.error('Error al obtener equipos:', error);
        this.mensajeError = 'Error al obtener los equipos. Por favor, inténtelo de nuevo más tarde.';
      }
    );
  }

  eliminarEquipo(idEquipo: number): void {
    this.equiposService.eliminarEquipo(idEquipo).subscribe(
      response => {
        console.log('Equipo eliminado:', response);
        this.obtenerEquipos(); // Actualiza la lista de equipos después de eliminar uno
      },
      error => {
        console.error('Error al eliminar equipo:', error);
        this.mensajeError = 'Error al eliminar el equipo. Por favor, inténtelo de nuevo más tarde.';
      }
    );
  }
}
