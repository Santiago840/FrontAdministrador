import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EquiposService } from '../../../services/equipos/equipos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from '../../../models/equipo';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html',
  styleUrls: ['./editar-equipo.component.css']
})
export class EditarEquipoComponent implements OnInit {
  equipo: Equipo={
    idEquipo: 0,
    nombreEquipo: '',
    capitanEquipo: '',
    jugadores: [],
    jugador1: '',
    jugador2: '',
    jugador3: '',
    jugador4: '',
    jugador5: '',
    jugador6: '',
    jugador7: '',
    jugador8: '',
    jugador9: '',
    matricula1: '',
    matricula2: '',
    matricula3: '',
    matricula4: '',
    matricula5: '',
    matricula6: '',
    matricula7: '',
    matricula8: '',
    matricula9: '',
    matricula10: '',
    nombre: '',
    nombreTorneo: ''
  }
  jugadores: any ={};
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
  ) { }

  ngOnInit(): void {
    // Recuperar el ID del torneo de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const idEquipo = Number(params.get('id'));
      if (!isNaN(idEquipo)) {
        // Si se proporciona, recuperar el torneo del servicio
        this.equiposService.getEquipo(idEquipo).subscribe(data => {
          this.equipo = data;
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
    this.equiposService.updateEquipo(this.equipo).subscribe(
      (response) => {
        console.log('Torneo actualizado correctamente:', response);
        // Redirigir a alguna otra página, por ejemplo, la lista de torneos
        
      },
      (error) => {
        console.error('Error actualizando el torneo:', error);
        // Manejar el error, podrías mostrar un mensaje de error al usuario
        this.openConfirmationModal('Torneo editado.');
        this.router.navigate(['/equipos']);
      }
    );
  }

}
