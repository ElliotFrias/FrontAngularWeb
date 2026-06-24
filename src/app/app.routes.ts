import { Routes } from '@angular/router';
import { ListaDeCategorias } from './components/features/categoria/lista-de-categorias/lista-de-categorias';
import { CategoriaForm } from './components/features/categoria/categoria-form/categoria-form';
import { ListaDeProductos } from './components/features/productos/lista-de-productos/lista-de-productos';
import { ProductoForm } from './components/features/productos/producto-form/producto-form';
import { Home } from './shared/home/home';

export const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component:Home},
  {path:'listaDeCategoria', component:ListaDeCategorias},
  {path:'categoriaForm', component:CategoriaForm},
  {path:'categoriaForm/:id', component:CategoriaForm},
  {path:'listaDeProductos', component:ListaDeProductos},
  {path:'productoForm', component:ProductoForm},
  {path:'productoForm/:id', component:ProductoForm}
];
