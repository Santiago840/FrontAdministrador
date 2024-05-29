import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './components/equipos/equipos.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { TorneosComponent } from './components/torneos/torneos.component'; 
import { PartidosComponent } from './components/partidos/partidos.component';
import { AgregarEquipoComponent } from './components/equipos/agregar-equipo/agregar-equipo.component';
import { AgregarPartidosComponent } from './components/partidos/agregar-partidos/agregar-partidos.component';

export const routes: Routes = [
    { path: 'equipos', component: EquiposComponent},
    { path: 'login', component: LoginComponent },
    { path: 'pagina-principal', component: PaginaPrincipalComponent },
    { path: 'torneos', component: TorneosComponent },
    { path: 'agregar-equipos', component: AgregarEquipoComponent },
    { path: 'partidos', component: PartidosComponent },
    { path: 'agregar-partidos', component: AgregarPartidosComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}