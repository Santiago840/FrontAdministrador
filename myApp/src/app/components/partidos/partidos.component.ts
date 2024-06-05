import { Component } from '@angular/core';
import { Partido } from '../../models/partido';
import { PartidoService } from '../../services/partidos/partido.service';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { OptionModalComponent } from '../../modals/option-modal/option-modal.component';

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
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.obtenerPartidos();
  }

  openConfirmationModal(message: string): void {
    this.dialog.open(ConfirmationModalComponent, {
      width: '600px',
      height: '150px',
      data: { message: message }
    });
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

  confirm(id: number): void {
    const dialogRef = this.dialog.open(OptionModalComponent, {
      width: '600px',
      height: '180px',
      data: { message: '¿Estás seguro de que quieres eliminar el partido?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.eliminarPartido(id);
      }
    });
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
        this.openConfirmationModal('Partido eliminado');
        this.partidoService.getPartidos().subscribe(data => {
          this.partidos = data;
        });
      }
    );
  }

  agregarPartido(): void {
    this.router.navigate(['/agregar-partido']);
  }

  editarPartido(idPartido: number): void {
    this.router.navigate(['/editar-partido/', idPartido])
  }

  irPaginaAnterior() {
    window.history.back();
  }

  irAgregarPartido() {
    this.router.navigate(['/agregar-partido']);
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


}
