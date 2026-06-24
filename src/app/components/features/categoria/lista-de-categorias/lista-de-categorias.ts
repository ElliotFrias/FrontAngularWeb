import { Component, ErrorHandler, inject, OnInit, signal } from '@angular/core';
import { Categoria } from '../../../../model/categoria';
import { HttpClient } from '@angular/common/http';
import { CategoriaService } from '../../../../service/categoria-service';
import Swal from 'sweetalert2';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-lista-de-categorias',
  imports: [RouterLink],
  templateUrl: './lista-de-categorias.html',
  styleUrl: './lista-de-categorias.css',
})
export class ListaDeCategorias implements OnInit {
  readonly titulo: string = 'Categorias de Productos';
  listaDeCategorias = signal<Categoria[]>([]);
  //inyectar el servicio
  private service = inject(CategoriaService);

  ngOnInit(): void {
    this.cargarCategorias();
  }

  private cargarCategorias(): void {
    this.service.mostrarCategorias().subscribe({
      next: (lasCategorias) => {
        this.listaDeCategorias.set(lasCategorias);
        console.log('Categorias cargadas:', lasCategorias);
      },
      error: (err) => console.error('Error al obtener las categorias', err),
    });
  }

  eliminar(categoria: Categoria): void {
    Swal.fire({
      title: '¿Estas seguro de eliminar esta categoria?',
      text: "No será posible revertir la eliminación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo!',
    }).then((result) => {
      if (result.isConfirmed)
        this.service.eliminarCategoria(categoria.idCategoria).subscribe({
          next: () => {
            // Eliminar la categoría de la lista local después de eliminarla del servidor
            this.cargarCategorias();
            Swal.fire({
              title: 'Eliminar Categoria!',
              text: 'La categoria seleccionada ha sido eliminada.',
              icon: 'success',
            });
          },
        });

    });
  }
}
/*
  titulo : string = "Categorias de Productos";
  listaDeCategorias : Categoria [] = [];
  / *listaDeCategorias : Categoria [] =
  [
    {
      idCategoria : 1,
      nombre : "Deportes",
      descripcion : "Articulos Deportivos"
    },
    {
      idCategoria : 2,
      nombre : "Linea Blanca",
      descripcion : "Articulos de Línea Blanca"
    },
    {
      idCategoria : 3,
      nombre : "Electronica",
      descripcion : "Articulos de Electronica"
    }
  ];* /

  httpClient = inject(HttpClient);

  constructor(private service : CategoriaService){}

  ngOnInit(): void {
    this.service.mostrarCategorias()
    .subscribe(
      {
        next : (lasCategorias) => {
          this.listaDeCategorias = lasCategorias;
        },
        error : (err) => console.error('Error al obtener las categorias', err)
      }
      );
  }

}
*/
