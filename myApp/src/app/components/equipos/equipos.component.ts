import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../models/equipo';
import { EquiposService } from '../../services/equipos/equipos.service';
import { Router } from '@angular/router';
import { OptionModalComponent } from '../../modals/option-modal/option-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
    private router: Router,
    private dialog: MatDialog
  ) { }

  confirmar(): void {
    const dialogRef = this.dialog.open(OptionModalComponent, {
      width: '600px',
      height: '180px',
      data: { message: '¿Estás seguro de que quieres cerrar sesión?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.logout();
      }
    });
  }


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

  confirm(id: number): void {
    const dialogRef = this.dialog.open(OptionModalComponent, {
      width: '600px',
      height: '180px',
      data: { message: '¿Estás seguro de que quieres eliminar el equipo?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.eliminarEquipo(id);
      }
    });
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

  irPaginaAnterior() {
    window.history.back();
  }

  logout() {
    this.router.navigate(['/login']); // Cambia 'login.html' por la URL de tu página de login
  }

  irEquipos(): void {
    this.router.navigate(['/equipos']);
  }

  irTorneos(): void {
    this.router.navigate(['/torneos']);
  }

  irPartidos(): void {
    this.router.navigate(['/partidos']);
  }

}
