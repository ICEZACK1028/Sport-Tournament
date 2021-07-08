import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './components/equipos/equipos.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeComponent } from './components/home/home.component';
import { LigasAdminComponent } from './components/ligas-admin/ligas-admin.component';
import { LoginComponent } from './components/login/login.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home-admin', component: HomeAdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'ligas-admin', component: LigasAdminComponent },
  { path: 'equipos/:idLiga', component: EquiposComponent },
  { path: "table-view/:idLiga", component: TableViewComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
