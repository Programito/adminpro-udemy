import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {

    this.aplicarCheck(link);

    // let url = `./assets/css/colors/${tema}.css`;
    // this._document.getElementById('tema').setAttribute('href', url);

    // this._ajustes.ajustes.tema = tema;
    // this._ajustes.ajustes.temaUrl = url;

    // this._ajustes.guardarAjustes();

    this._ajustes.aplicarTema(tema);

  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName('selector');

    // quitar la class working(indica la posicion seleccionada) a todos los selectores
    for ( let ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');

    let tema= this._ajustes.ajustes.tema;

    for ( let ref of selectores) {
      if (ref.getAttribute('data-theme')=== tema){
        ref.classList.add('working');
        break;
      }
    }


  }

}
