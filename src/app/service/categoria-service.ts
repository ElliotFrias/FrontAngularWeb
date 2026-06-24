import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';;
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private http = inject(HttpClient);
  private readonly urlEndPoint = "https://backspringboot-wixa.onrender.com/api/v1/categorias/categoria";
  private httpHeaders = new HttpHeaders({
    'Content-Type':'application/json'
  });

  mostrarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlEndPoint);
  }

   //mostrar una ctaegoria
  leerCategoria(id : number):Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`)
  }

  //crear categoria
  crearCategoria(categoria : Categoria) : Observable<Categoria>{
    return this.http.post<Categoria>
    (this.urlEndPoint, categoria,
      {headers: this.httpHeaders})

  }

    //eliminar categoria
  eliminarCategoria(id : number) : Observable<Categoria>{
    return this.http.delete<Categoria>
    (`${this.urlEndPoint}/${id}`,
      {headers: this.httpHeaders}
     );
  }

    //actualizar
  actualizarCategoria(categoria : Categoria) : Observable<Categoria>{
    return this.http.put<Categoria>(
      `${this.urlEndPoint}/${categoria.idCategoria}`,
      categoria,
      {headers: this.httpHeaders}
    );
  }

}
  /*
  //Definir la URL del endpoint con el que se va a treabajar
  private urlEndPoint : string = "http://localhost:8080/api/categorias";
  private httpHeaders = new HttpHeaders({
    'Content-Type':'application/json'
  });

  constructor(private http: HttpClient) {}

  //mostrar todas las categorias
  mostrarCategoria(): Observable<Categoria[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Categoria[])
    );
  }
  //mostrar una ctaegoria
  leerCategoria(id : number):Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`)
  }
  //crear categoria
  crearCategoria(categoria : Categoria) : Observable<Categoria>{
    return this.http.post<Categoria>
    (this.urlEndPoint, categoria,
      {headers: this.httpHeaders})

  }
  //eliminar categoria
  eliminarCategoria(id : number) : Observable<Categoria>{
    return this.http.delete<Categoria>
    (`${this.urlEndPoint}/${id}`,
      {headers: this.httpHeaders})
  }

  //actualizar
  actualizarCategoria(categoria : Categoria) : Observable<Categoria>{
    return this.http.put<Categoria>(
      `${this.urlEndPoint}/${categoria.idCategoria}`,
      categoria,
      {headers: this.httpHeaders}
    );
  }
}*/
