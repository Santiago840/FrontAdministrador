import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposService } from '../../services/equipos/equipos.service';
import { Equipo } from '../../models/equipo';
import { OptionModalComponent } from '../../modals/option-modal/option-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements AfterViewInit {
  @ViewChild('footer') footer!: ElementRef;


  ngAfterViewInit() {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      if (scrollPosition >= pageHeight) {
        this.footer.nativeElement.style.display = 'flex';
      } else {
        this.footer.nativeElement.style.display = 'none';
      }
    });

  }

  constructor(
    private router: Router, 
    private equiposService: EquiposService, 
    private dialog: MatDialog) { }

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
}
