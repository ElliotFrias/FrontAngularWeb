import { Component, input, inject, Injectable, OnInit, signal } from '@angular/core';
import { Categoria } from '../../../../model/categoria';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../../service/categoria-service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-form',
  imports: [FormsModule],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm implements OnInit{
  readonly titulo: string = 'Categorias Form';
  laCategoria = signal<Categoria> (new Categoria());

  id = input<number>();
  private router = inject(Router);
  private service = inject(CategoriaService);

  ngOnInit(): void {
    this.cargarCategoriaExistente();
  }

  private cargarCategoriaExistente(): void {
    const elId = this.id();
    if (elId){
      this.service.leerCategoria(elId).subscribe(
        {
        next: (laCategoriaLeida) => this.laCategoria.set(laCategoriaLeida),
        error: (err) => console.error('Error al obtener la categoria', err)
      }
    );
    }
  }



  registrarCategoria():void{
    this.service.crearCategoria(this.laCategoria()).subscribe({
      next : (cat) => {
        this.router.navigate(['/listaDeCategoria']);
        Swal.fire({
          title: 'Categoria Registrada!',
          text: `La categoria ${cat.nombreCategoria} ha sido registrada con éxito.`,
          icon: 'success',
        });
       },
      error : (err) => {
        console.error('Error al registrar la categoria', err);
      }
    })
  }

  actualizarCategoria(): void{
    this.service.actualizarCategoria(this.laCategoria()).subscribe({
      next : () => {
        this.router.navigate(['/listaDeCategoria']);
        Swal.fire({
          title: 'Categoria Actualizada!',
          text: `La categoria ${this.laCategoria().nombreCategoria} ha sido actualizada con éxito.`,
          icon: 'success',
        });
       },
      error : (err) => {
        console.error('Error al actualizar la categoria', err);
      }
    })
  }

}
