import { Component } from '@angular/core';
import { Equipo } from '../../../models/equipo';
import { Torneo } from '../../../models/Torneo';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidoService } from '../../../services/partidos/partido.service';
import { MatDialog } from '@angular/material/dialog';
import { EquiposService } from '../../../services/equipos/equipos.service';
import { TorneoService } from '../../../services/torneo.service';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';
import { OptionModalComponent } from '../../../modals/option-modal/option-modal.component';

@Component({
  selector: 'app-editar-partido',
  templateUrl: './editar-partido.component.html',
  styleUrl: './editar-partido.component.css'
})
export class EditarPartidoComponent {
  partido: any = {};
  equipos: Equipo[] = [];
  torneos: Torneo[] = [];
  estatus: string[] = ['En curso', 'Pendiente', 'Finalizado'];
  minDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partidoService: PartidoService,
    private dialog: MatDialog,
    private equiposService: EquiposService,
    private torneosService: TorneoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idPartido = Number(params.get('idPartido'));
      if (!isNaN(idPartido)) {
        this.partidoService.getPartido(idPartido).subscribe(data => {
          this.partido = data;
          console.log(data);

          this.setMinDate();


          // Recuperar los torneos (debes implementar este método)
          this.llenarTorneos();
          this.llenarEquipos();

        });
      } else {
        console.error('ID de equipo no válido.');
        this.router.navigate(['/ruta-de-redireccion']);
      }
    });
  }

  setMinDate(): void {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    this.minDate = `${year}-${month}-${day}`;
    this.partido.fechaPartido = this.minDate;
  }

  openConfirmationModal(message: string): void {
    this.dialog.open(ConfirmationModalComponent, {
      width: '600px',
      height: '150px',
      data: { message: message }
    });
  }
  llenarEquipos(): void {
    this.equiposService.getEquipos().subscribe(
      (response: Equipo[]) => {
        this.equipos = response;
        if (this.equipos.length > 0) {
          const equipo1 = this.equipos.find(equipo => equipo.nombreEquipo === this.partido.Equipo1);
          const equipo2 = this.equipos.find(equipo => equipo.nombreEquipo === this.partido.Equipo2);
          if (equipo1) {
            this.partido.idEquipo1 = equipo1.idEquipo;
          }
          if (equipo2) {
            this.partido.idEquipo2 = equipo2.idEquipo;
          }
        } else {
          console.error('No se encontraron equipos.');
        }
      },
      (error) => {
        console.error('Error obteniendo los equipos:', error);
      }
    );
  }

  llenarFecha(): void {
    const fechaPartido = new Date(this.partido.Fecha);
    this.minDate = fechaPartido.toISOString().split('T')[0];
  }


  llenarTorneos(): void {
    // Recupera los torneos disponibles (puedes llamar a un servicio o cargarlos localmente)
    // Por ejemplo:
    this.torneosService.getTorneos().subscribe(
      (response: Torneo[]) => {
        this.torneos = response;
        // Asigna el torneo correspondiente al nombre del equipo
        const torneoSeleccionado = this.torneos.find(torneo => torneo.Torneo === this.partido.Torneo);
        if (torneoSeleccionado) {
          this.partido.idTorneo = torneoSeleccionado.idTorneo;
        }
      },
      (error) => {
        console.error('Error obteniendo los torneos:', error);
      }
    );
  }

  validateForm(): boolean {
    if (this.partido.idEquipo1 === this.partido.idEquipo2) {
      this.openConfirmationModal('Los equipos no pueden ser iguales.');
      return false;
    }
    return true;
  }
  submitForm(): void {
    if (this.validateForm()) {
      this.partidoService.createPartido(this.partido).subscribe(
        (response) => {
          console.log('Partido creado exitosamente:', response);
          this.router.navigate(['/partidos']); // Redireccionar a la página de partidos
        },
        (error) => {
          console.error('Error al crear partido:', error);
          // Manejar el error de creación del partido
        }
      );

      this.partidoService.eliminarPartido(this.partido.idPartido).subscribe(
        (response) => {
          console.log('Partido eliminado exitosamente:', response);
          // Realizar acciones adicionales después de eliminar el partido si es necesario
        },
        (error) => {
          console.error('Error al eliminar partido:', error);
          // Manejar el error de eliminación del partido
        }
      );
    }
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
