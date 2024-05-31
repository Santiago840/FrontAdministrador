import { Component } from '@angular/core';
import { PartidoService } from '../../../services/partidos/partido.service';
import { Partido } from '../../../models/partido';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../../services/torneo.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-agregar-partidos',
  templateUrl: './agregar-partidos.component.html',
  styleUrl: './agregar-partidos.component.css'
})
export class AgregarPartidosComponent {
  partido: any = {};
  deportes = [
    { id: 1, nombre: 'Voleibol' },
    { id: 2, nombre: 'Futbol' },
    { id: 3, nombre: 'Basquetbol' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partidoService: PartidoService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    
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
    this.partidoService.createPartido(this.partido).subscribe(
      (response) => {
        console.log('Partido creado torneo correctamente:', response);
        this.openConfirmationModal('Partido creado.');
        this.router.navigate(['/torneos']);
        // Redirigir a alguna otra página, por ejemplo, la lista de torneos
        
      },
      (error) => {
        console.error('Error actualizando el partido:', error);
        // Manejar el error, podrías mostrar un mensaje de error al usuario
        
      }
    );
  }
}
