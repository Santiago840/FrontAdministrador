import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './components/equipos/equipos.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { TorneosComponent } from './components/torneos/torneos.component'; 
import { PartidosComponent } from './components/partidos/partidos.component';
import { EditarEquipoComponent } from './components/equipos/editar-equipo/editar-equipo.component';
import { AgregarPartidosComponent } from './components/partidos/agregar-partidos/agregar-partidos.component';
import { EditarTorneoComponent } from './components/editar-torneo/editar-torneo.component';
import { AgregarTorneoComponent } from './components/agregar-torneo/agregar-torneo.component';
import { EditarPartidoComponent } from './components/partidos/editar-partido/editar-partido.component';

export const routes: Routes = [
    { path: 'equipos', component: EquiposComponent},
    { path: 'login', component: LoginComponent },
    { path: 'pagina-principal', component: PaginaPrincipalComponent },
    { path: 'torneos', component: TorneosComponent },
    { path: 'partidos', component: PartidosComponent },
    {path: 'agregar-torneo', component: AgregarTorneoComponent},
    {path:  'editar-torneo/:id',component: EditarTorneoComponent},
    { path: 'editar-equipo/:idEquipo', component: EditarEquipoComponent},
    { path: 'agregar-partido', component: AgregarPartidosComponent},
    { path: 'editar-partido/:idPartido', component: EditarPartidoComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}