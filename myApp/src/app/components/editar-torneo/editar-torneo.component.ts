import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../services/torneo.service';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
  
}