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

export const routes: Routes = [
    { path: 'equipos', component: EquiposComponent},
    { path: 'login', component: LoginComponent },
    { path: 'pagina-principal', component: PaginaPrincipalComponent },
    { path: 'torneos', component: TorneosComponent },
    { path: 'partidos', component: PartidosComponent },
    { path: 'editar-equipo', component: EditarEquipoComponent},
    { path: 'agregar-partidos', component: AgregarPartidosComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'agregar-torneo', component: AgregarTorneoComponent},
    {path:  'editar-torneo/:id',component: EditarTorneoComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}