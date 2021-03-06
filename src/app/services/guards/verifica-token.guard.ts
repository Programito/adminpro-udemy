import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

   constructor(
      public _usuarioService: UsuarioService,
      public router: Router
   ) { }

    canActivate(): Promise<boolean> | boolean {

    console.log('Token Guard');

    let token = this._usuarioService.token;

    let payload = JSON.parse(atob(token.split('.')[1]));

    let expirado = this.expirado(payload.exp);

    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    }

    //console.log(payload);



    return this.verificaRenueva(payload.exp);
  }


  verificaRenueva( fechaExp: number): Promise<boolean> {
      return new Promise ( (resolve, reject) => {
         let tokenExp= new Date( fechaExp * 1000);
         let ahora = new Date();
         // 4 horas
         ahora.setTime(ahora.getTime( ) + (4 * 60 * 60 * 1000));
          console.log(tokenExp); // fecha expiracion
          console.log(ahora); // actual + 4 horas

         if ( tokenExp.getTime() > ahora.getTime()) {
           resolve(true);
         // falta menos de 4 horas para expirar
         } else {
                this._usuarioService.renuevaToken()
                .subscribe(() => {
                  resolve(true);
                }, () => {
                  this.router.navigate(['/login']);
                   reject(false);
                });
         }

      });
  }


  expirado(fechaExp: number) {
    // pasarlo a segundos ya que esta en milisegunndos
    let ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora) {
      return true;
    } else {
       return false;
    }
  }

}
