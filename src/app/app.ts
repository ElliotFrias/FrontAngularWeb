import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Calculadora } from "./calculadora/calculadora";
import { Home } from './shared/home/home';
import { Header } from "./shared/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Calculadora, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titulo : string = 'Primera App en Angular';
  autor: string = 'Elliot Frias';
}
