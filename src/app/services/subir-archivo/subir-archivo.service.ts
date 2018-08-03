import { Injectable } from '@angular/core';
import { resolve } from '../../../../node_modules/@types/q';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }


  subirArchivo(archivo: File, tipo: string, id: string) {
    console.log(tipo);
    return new Promise( (resolve, reject) => {
      let formData = new FormData();
      let xhr= new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function() {
          //termina el proceso
          if (xhr.readyState === 4) {
            if ( xhr.status === 200) {
              console.log('Imagen subida');
              resolve (JSON.parse(xhr.response));
            } else {
              console.log('Fallo la subida');
              reject(xhr.response);
            }
          }
      };
      let url=  URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      console.log(url);
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });




  }
}
