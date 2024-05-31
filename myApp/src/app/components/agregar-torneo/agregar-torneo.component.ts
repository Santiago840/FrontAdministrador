import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../services/torneo.service';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

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

  openConfirmationModal(message: string): void {
    this.dialog.open(ConfirmationModalComponent, {
      width: '600px',
      height: '150px',
      data: { message: message }
    });
  }

  submitForm(): void {
    // Lógica para enviar el formulario (actualizar el torneo)
    this.torneoService.createTorneo(this.torneo).subscribe(
      (response) => {
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
  
}
