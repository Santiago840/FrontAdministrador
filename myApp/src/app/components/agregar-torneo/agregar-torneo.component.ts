import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../services/torneo.service';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { OptionModalComponent } from '../../modals/option-modal/option-modal.component';

@Component({
  selector: 'app-agregar-torneo',
  templateUrl: './agregar-torneo.component.html',
  styleUrl: './agregar-torneo.component.css'
})
export class AgregarTorneoComponent implements OnInit {
  torneo: any = {};
  deportes = [
    { id: 1, nombre: 'Voleibol' },
    { id: 2, nombre: 'Futbol' },
    { id: 3, nombre: 'Basquetbol' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private torneoService: TorneoService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

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
    this.torneoService.createTorneo(this.torneo).subscribe(
      (response) => {
        console.log(this.torneo);
        console.log('Torneo creado torneo correctamente:', response);
        this.openConfirmationModal('Torneo creado.');
        this.router.navigate(['/torneos']);
        // Redirigir a alguna otra página, por ejemplo, la lista de torneos

      },
      (error) => {
        console.error('Error actualizando el torneo:', error);
        // Manejar el error, podrías mostrar un mensaje de error al usuario

      }
    );
  }

  irPaginaAnterior() {
    window.history.back();
  }

  logout() {
    this.router.navigate(['/login']); // Cambia 'login.html' por la URL de tu página de login
  }

}
