import { Component, OnInit } from '@angular/core';
import { PartidoService } from '../../../services/partidos/partido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';
import { Equipo } from '../../../models/equipo';
import { EquiposService } from '../../../services/equipos/equipos.service';
import { Torneo } from '../../../models/Torneo';
import { TorneoService } from '../../../services/torneo.service';
import { OptionModalComponent } from '../../../modals/option-modal/option-modal.component';

@Component({
  selector: 'app-agregar-partidos',
  templateUrl: './agregar-partidos.component.html',
  styleUrls: ['./agregar-partidos.component.css']
})
export class AgregarPartidosComponent implements OnInit {
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
    private torneoService: TorneoService
  ) { }

  ngOnInit(): void {
    this.llenarEquipos();
    this.llenarTorneos();
    this.setMinDate();
    this.partido.estatus = this.estatus[0];
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
          this.partido.idEquipo1 = this.equipos[0].idEquipo;
          this.partido.idEquipo2 = this.equipos[1].idEquipo;
        } else {
          this.partido.idEquipo1 = this.equipos[0].idEquipo;
        }
      },
      (error) => {
        console.error('Error obteniendo los equipos:', error);
      }
    );
  }

  llenarTorneos(): void {
    this.torneoService.getTorneos().subscribe(
      (response: Torneo[]) => {
        this.torneos = response;
        if (this.torneos.length > 0) {
          this.partido.idTorneo = this.torneos[0].idTorneo;
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
          console.log('Partido creado correctamente:', response);
          this.openConfirmationModal('Partido creado.');
          this.router.navigate(['/partidos']);
        },
        (error) => {
          console.log(this.partido);
          console.error('Error creando el partido:', error);
        }
      );
    }
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
