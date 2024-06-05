import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EquiposService } from '../../../services/equipos/equipos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from '../../../models/equipo';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';
import { Torneo } from '../../../models/Torneo';
import { TorneoService } from '../../../services/torneo.service';
import { OptionModalComponent } from '../../../modals/option-modal/option-modal.component';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html',
  styleUrls: ['./editar-equipo.component.css']
})
export class EditarEquipoComponent implements OnInit {
  equipo: any = {}
  jugadores: any = {};
  torneos: Torneo[] = [];
  deportes = [
    { id: 1, nombre: 'Voleibol' },
    { id: 2, nombre: 'Basquetbol' },
    { id: 3, nombre: 'Fútbol' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equiposService: EquiposService,
    private dialog: MatDialog,
    private torneosService: TorneoService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idEquipo = Number(params.get('idEquipo'));
      if (!isNaN(idEquipo)) {
        this.equiposService.getEquipo(idEquipo).subscribe(data => {
          this.equipo = data;
          console.log(data);

          // Asignar el deporte al campo 'Deporte'
          const deporteSeleccionado = this.deportes.find(d => d.id === this.equipo.idEquipo);
          if (deporteSeleccionado) {
            this.equipo.Deporte = deporteSeleccionado.nombre;
          }

          // Recuperar los torneos (debes implementar este método)
          this.llenarTorneos();
        });
      } else {
        console.error('ID de equipo no válido.');
        this.router.navigate(['/ruta-de-redireccion']);
      }
    });
  }

  llenarTorneos(): void {
    // Recupera los torneos disponibles (puedes llamar a un servicio o cargarlos localmente)
    // Por ejemplo:
    this.torneosService.getTorneos().subscribe(
      (response: Torneo[]) => {
        this.torneos = response;
        // Asigna el torneo correspondiente al nombre del equipo
        const torneoSeleccionado = this.torneos.find(torneo => torneo.Torneo === this.equipo.Torneo);
        if (torneoSeleccionado) {
          this.equipo.idTorneo = torneoSeleccionado.idTorneo;
        }
      },
      (error) => {
        console.error('Error obteniendo los torneos:', error);
      }
    );
  }

  openConfirmationModal(message: string): void {
    this.dialog.open(ConfirmationModalComponent, {
      width: '600px',
      height: '150px',
      data: { message: message }
    });
  }

  submitForm(): void {
    console.log('Equipo actualizado correctamente:', this.equipo);
    // Lógica para enviar el formulario (actualizar el equipo)
    this.equiposService.updateEquipo(this.equipo.idEquipo, this.equipo).subscribe(
      (response) => {
        console.log('Equipo actualizado correctamente:', response);
        // Redirigir a alguna otra página, por ejemplo, la lista de equipos
        this.openConfirmationModal('Equipo editado.');
        this.router.navigate(['/equipos']);
      },
      (error) => {
        console.error('Error actualizando el equipo:', error);
        // Manejar el error, podrías mostrar un mensaje de error al usuario

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



  irEquipos(): void {
    this.router.navigate(['/equipos']);
  }

  irTorneos(): void {
    this.router.navigate(['/torneos']);
  }

  irPartidos(): void {
    this.router.navigate(['/partidos']);
  }

  irPaginaAnterior() {
    window.history.back();
  }

  logout() {
    this.router.navigate(['/login']); // Cambia 'login.html' por la URL de tu página de login
  }

}
