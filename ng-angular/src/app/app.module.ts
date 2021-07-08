import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { LigasAdminComponent } from './components/ligas-admin/ligas-admin.component';
import { TableViewComponent } from './components/table-view/table-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeAdminComponent,
    LoginComponent,
    NavbarComponent,
    UsuariosComponent,
    EquiposComponent,
    LigasAdminComponent,
    TableViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
