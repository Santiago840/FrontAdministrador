import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposService } from '../../services/equipos/equipos.service';
import { Equipo } from '../../models/equipo';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent {
  constructor(private router: Router, private equiposService: EquiposService) { }

  irEquipos(): void {
    this.router.navigate(['/equipos']);
  }

  irTorneos(): void {
    this.router.navigate(['/torneos']);
  }

  irPartidos(): void {
    this.router.navigate(['/partidos']);
  }

  equipos: Equipo[] = [];
  mensajeError: string | null = null;

  ngOnInit(): void {
    this.obtenerEquipos();
  }

  obtenerEquipos(): void {
    this.equiposService.getEquipos().subscribe(
      response => {
        this.equipos = response.map((equipo: any) => {
          equipo.jugadores = equipo.jugadores.split(',').map((jugador: string) => jugador.trim());
          return equipo;
        });
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

  editarEquipo(idEquipo: number): void {
    this.router.navigate(['/editar-equipo', idEquipo]); // Navega a la pantalla de edición con el idEquipo
  }
}
