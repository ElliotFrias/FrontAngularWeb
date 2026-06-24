import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private http = inject(HttpClient);
  private readonly urlEndPoint = "https://web-bttu.onrender.com/api/v1/productos";
  private httpHeaders = new HttpHeaders({
    'Content-Type':'application/json'
  });

  mostrarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  leerProducto(id : number):Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`)
  }

  crearProducto(producto : Producto) : Observable<Producto>{
    return this.http.post<Producto>(
      this.urlEndPoint, 
      producto,
      {headers: this.httpHeaders}
    )
  }

  eliminarProducto(id : number) : Observable<Producto>{
    return this.http.delete<Producto>(
      `${this.urlEndPoint}/${id}`,
      {headers: this.httpHeaders}
    );
  }

  actualizarProducto(producto : Producto) : Observable<Producto>{
    return this.http.put<Producto>(
      `${this.urlEndPoint}/${producto.idProducto}`,
      producto,
      {headers: this.httpHeaders}
    );
  }
}
