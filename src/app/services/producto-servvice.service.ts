import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoServviceService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  public listarProductos(): Observable<any> {
    return this.http.get('http://localhost:3000/producto/listarProducto').pipe(
      catchError(e => {
        swal.fire('Error al recuperar los productos', e.error.mensaje, 'error');
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  guardarProducto(bodyObj: any): Observable<any> {
    return this.http
      .post('http://localhost:3000/producto/guardarProducto', JSON.parse(JSON.stringify(bodyObj)), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
      })
      .pipe(
        map((response: any) => response),
        catchError(e => {
          swal.fire('Error al guardar el producto', e.error.mensaje, 'error');
          console.error(e.error.message);
          return throwError(e);
        })
      )
  }



  actualizarProducto(bodyObj: any): Observable<any> {
    return this.http
      .post('http://localhost:3000/producto/actualizarProducto', JSON.parse(JSON.stringify(bodyObj)), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
      })
      .pipe(
        map((response: any) => response),
        catchError(e => {
          swal.fire('Error al guardar el producto', e.error.mensaje, 'error');
          console.error(e.error.message);
          return throwError(e);
        })
      )
  }

  public borrarProducto(idProducto: number): Observable<any> {
    return this.http
      .post('http://localhost:3000/producto/borrarProductos?idProducto=' + idProducto, null, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
      })
      .pipe(
        map((response: any) => response),
        catchError(e => {
          // swal.fire('Error al actualizar los datos', e.error.mensaje, 'error');
          console.error(e.error.message);
          return throwError(e);
        })
      )
  }
}
