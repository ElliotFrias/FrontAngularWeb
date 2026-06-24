import { Component, input, inject, OnInit, signal } from '@angular/core';
import { Producto } from '../../../../model/producto';
import { Router } from '@angular/router';
import { ProductoService } from '../../../../service/producto-service';
import { CategoriaService } from '../../../../service/categoria-service';
import { Categoria } from '../../../../model/categoria';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-form',
  imports: [FormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.css',
})
export class ProductoForm implements OnInit {
  readonly titulo: string = 'Producto Form';
  elProducto = signal<Producto> (new Producto());
  lasCategorias = signal<Categoria[]>([]);

  id = input<number>();
  private router = inject(Router);
  private service = inject(ProductoService);
  private categoriaService = inject(CategoriaService);

  ngOnInit(): void {
    this.cargarProductoExistente();
    this.cargarCategorias();
  }

  private cargarCategorias(): void {
    this.categoriaService.mostrarCategorias().subscribe({
      next: (categorias) => this.lasCategorias.set(categorias),
      error: (err) => console.error('Error al cargar categorias', err)
    });
  }

  private cargarProductoExistente(): void {
    const elId = this.id();
    if (elId){
      this.service.leerProducto(elId).subscribe({
        next: (elProductoLeido) => this.elProducto.set(elProductoLeido),
        error: (err) => console.error('Error al obtener el producto', err)
      });
    }
  }

  registrarProducto():void{
    this.service.crearProducto(this.elProducto()).subscribe({
      next : (prod) => {
        this.router.navigate(['/listaDeProductos']);
        Swal.fire({
          title: 'Producto Registrado!',
          text: `El producto ${prod.nombreProducto} ha sido registrado con éxito.`,
          icon: 'success',
        });
       },
      error : (err) => {
        console.error('Error al registrar el producto', err);
      }
    })
  }

  actualizarProducto(): void{
    this.service.actualizarProducto(this.elProducto()).subscribe({
      next : () => {
        this.router.navigate(['/listaDeProductos']);
        Swal.fire({
          title: 'Producto Actualizado!',
          text: `El producto ${this.elProducto().nombreProducto} ha sido actualizado con éxito.`,
          icon: 'success',
        });
       },
      error : (err) => {
        console.error('Error al actualizar el producto', err);
      }
    })
  }

  compararCategoria(o1: Categoria, o2: Categoria): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idCategoria === o2.idCategoria;
  }
}
