import { Component, inject, OnInit, signal } from '@angular/core';
import { Producto } from '../../../../model/producto';
import { ProductoService } from '../../../../service/producto-service';
import Swal from 'sweetalert2';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-lista-de-productos',
  imports: [RouterLink],
  templateUrl: './lista-de-productos.html',
  styleUrl: './lista-de-productos.css',
})
export class ListaDeProductos implements OnInit {
  readonly titulo: string = 'Lista de Productos';
  listaDeProductos = signal<Producto[]>([]);
  private service = inject(ProductoService);

  ngOnInit(): void {
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.service.mostrarProductos().subscribe({
      next: (losProductos) => {
        this.listaDeProductos.set(losProductos);
        console.log('Productos cargados:', losProductos);
      },
      error: (err) => console.error('Error al obtener los productos', err),
    });
  }

  eliminar(producto: Producto): void {
    Swal.fire({
      title: '¿Estas seguro de eliminar este producto?',
      text: "No será posible revertir la eliminación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo!',
    }).then((result) => {
      if (result.isConfirmed)
        this.service.eliminarProducto(producto.idProducto).subscribe({
          next: () => {
            // Recargar la lista después de eliminar
            this.cargarProductos();
            Swal.fire({
              title: 'Eliminar Producto!',
              text: 'El producto seleccionado ha sido eliminado.',
              icon: 'success',
            });
          },
        });
    });
  }
}
