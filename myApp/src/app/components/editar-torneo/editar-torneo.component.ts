import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../services/torneo.service';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { OptionModalComponent } from '../../modals/option-modal/option-modal.component';

@Component({
  selector: 'app-editar-torneo',
  templateUrl: './editar-torneo.component.html',
  styleUrls: ['./editar-torneo.component.css']
})
export class EditarTorneoComponent implements OnInit {
  torneo: any = {};
  deportes = [
    { id: 1, nombre: 'Voleibol' },
    { id: 2, nombre: 'Basquetbol' },
    { id: 3, nombre: 'Fútbol' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private torneoService: TorneoService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // Recuperar el ID del torneo de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const idTorneo = Number(params.get('id'));
      if (!isNaN(idTorneo)) {
        // Si se proporciona, recuperar el torneo del servicio
        this.torneoService.getTorneo(idTorneo).subscribe(data => {
          this.torneo = data;
        });
      } else {
        // Si no se proporciona un ID de torneo válido, manejar el caso en consecuencia
        console.error('ID de torneo no válido.');
        // Por ejemplo, podrías redirigir a otra página
        this.router.navigate(['/ruta-de-redireccion']);
      }
    });
  }

  openConfirmationModal(message: string): void {
    this.dialog.open(ConfirmationModalComponent, {
      width: '600px',
      height: '150px',
      data: { message: message }
    });
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


  submitForm(): void {
    // Lógica para enviar el formulario (actualizar el torneo)
    this.torneoService.updateTorneo(this.torneo).subscribe(
      (response) => {
        console.log('Torneo actualizado correctamente:', response);
        // Redirigir a alguna otra página, por ejemplo, la lista de torneos

      },
      (error) => {
        console.error('Error actualizando el torneo:', error);
        // Manejar el error, podrías mostrar un mensaje de error al usuario
        this.openConfirmationModal('Torneo editado.');
        this.router.navigate(['/torneos']);
      }
    );
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
