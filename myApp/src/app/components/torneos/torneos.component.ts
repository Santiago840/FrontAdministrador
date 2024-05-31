import { Component, OnInit } from '@angular/core';
import { TorneoService } from '../../services/torneo.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'; 
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { ErrorModalComponent } from '../../modals/error-modal/error-modal.component';
import { OptionModalComponent } from '../../modals/option-modal/option-modal.component';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css']
})
export class TorneosComponent implements OnInit {
  torneos: any[] = [];

  constructor(
    private torneoService: TorneoService, 
    private dialog: MatDialog,
    private router: Router // Inyectar Router
  ) {}

  ngOnInit(): void {
    this.torneoService.getTorneos().subscribe(data => {
      this.torneos = data;
    });
  }

  openConfirmationModal(message: string): void {
    this.dialog.open(ConfirmationModalComponent, {
      width: '600px',
      height: '150px',
      data: { message: message }
    });
  }

  openErrorModal(message: string): void {
    this.dialog.open(ErrorModalComponent, {
      width: '600px',
      height: '150px',
      data: { message: message }
    });
  }

  confirm(id: number): void {
    const dialogRef = this.dialog.open(OptionModalComponent, {
      width: '600px',
      height: '180px',
      data: { message: '¿Estás seguro de que quieres eliminar el torneo?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteTorneo(id);
      }
    });
  }

  deleteTorneo(id: number): void {
    this.torneoService.deleteTorneos(id).subscribe({
      next: (response) => {
        console.log('Eliminar torneo con ID:', id);
        this.openConfirmationModal('Torneo eliminado.');
        this.torneoService.getTorneos().subscribe(data => {
          this.torneos = data;
        });
      },
      error: (err) => {
        console.error('Error eliminando el torneo:', err);
        this.openErrorModal('Error eliminando el torneo.');
      }
    });
  }

  editTorneo(id: number): void {
    this.router.navigate(['/editar-torneo', id]); 
  }
}
