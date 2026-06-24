import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  imports: [],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css',
})
export class Calculadora {
  titulo : string = "Operaciones Basicas";
  resultado : number = 0;
  numeroUno : number = 10;
  numeroDos : number = 10;

  sumar(): void{
    this.resultado = this.numeroUno + this.numeroDos;
  }

  restar(): void{
    this.resultado = this.numeroUno - this.numeroDos;
  }

  multiplicar(): void{
    this.resultado = this.numeroUno * this.numeroDos;
  }

  dividir(): void{
    if(this.numeroDos != 0){
      this.resultado = this.numeroUno / this.numeroDos;
    }else{
      alert("No se puede dividir entre cero");
    }
  }

}
