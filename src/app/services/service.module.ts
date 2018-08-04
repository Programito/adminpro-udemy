import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


import {
  SettingsService ,
  SidebarService,
  SharedService,
  UsuarioService,
  SubirArchivoService
} from './service.index';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }
