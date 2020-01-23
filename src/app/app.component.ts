import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  precio_btc : number;
  input_btc : number;

  precio_usd : number;
  input_usd : number;
  
  precio_ves : number;
  input_ves : number;
  lado = 4;

  constructor(private http: HttpClient){

  }

  ngOnInit(){
    console.log('init')
    this.set_precio_btc();
    this.set_precio_usd();
    this.set_precio_ves();
  }

  set_precio_btc(){
    console.log('btc')
    let url : string = 'https://api.coinmarketcap.com/v1/ticker/';
    this.http.get(url).subscribe(
      res => {
        this.precio_btc = this.input_usd = this.formatear(parseFloat(res[0].price_usd), 2)
      });
    this.input_btc = 1;
    
  }
  
  get_btc(){
    return this.precio_btc;
  }
  
  set_precio_usd(){
    console.log('usd')
    let url = 'https://s3.amazonaws.com/dolartoday/data.json';
    this.http.get(url).subscribe(res => {
      this.precio_usd = this.formatear(res['USD'].dolartoday,2)

    });
  }

  get_usd(){
    return this.precio_usd;
  }

  set_precio_ves(){
    console.log('ves')
    let url = 'https://s3.amazonaws.com/dolartoday/data.json';
    this.http.get(url).subscribe(res => {
      this.input_ves = this.precio_ves = this.formatear(res['USD'].dolartoday,2)
      console.log("1) " + this.precio_ves)
    });

    url = 'https://api.coinmarketcap.com/v1/ticker/';
    this.http.get(url).subscribe(
      res => {
        this.precio_ves *= this.formatear(parseFloat(res[0].price_usd), 2)
        console.log("2) " +this.precio_ves)
        this.input_ves *= this.formatear(parseFloat(res[0].price_usd), 2)
      });

  }


  get_ves(){
    return this.precio_ves;
  }

  cambio_btc(value){
    this.input_usd = parseFloat((value * this.get_btc()).toFixed(2));
    this.input_ves = parseFloat((value * this.get_ves()).toFixed(2));
  }

  cambio_usd(value){
    let btc = value / this.get_btc();
    this.input_btc = parseFloat(btc.toFixed(8));
    let ves = value * this.get_usd();
    this.input_ves = parseFloat(ves.toFixed(2));
  }

  cambio_ves(value){
    let btc = value / this.get_ves();
    this.input_btc = parseFloat(btc.toFixed(8));
    let ves = value / this.get_usd();
    this.input_usd = parseFloat(ves.toFixed(2));
  }

  formatear(value : number, decimales : number){
    return parseFloat(value.toFixed(decimales))
  }

  // set_ves(){
  //   return (this.input_usd * this.precio_btc);
  // }

  // // convert btc

  // btc_to_usd(valor: number){
  //   // retorna la cantidad de usd en 'valor' btc
  //   return (valor * this.precio_btc)
  // }

  // btc_to_ves(valor: number){
  //   // retorna la cantidad de ves en 'valor' btc
  //   let btc: number =  1 / this.precio_btc
  //   return (valor * this.precio_usd)/btc;
  // }

  // set_calculos_btc(valor:number = 1){
  //   this.input_usd = this.btc_to_usd(valor);
  // }

  // // convert usd

  // usd_to_btc(valor: number){
  //   // retorna la cantidad de btc en 'valor' usd
  //   return (valor / this.precio_btc)
  // }

  // usd_to_ves(valor: number){
  //   // retorna la cantidad de ves en 'valor' usd
  //   return (valor * this.precio_usd);
  // }

  // // convert ves

  // ves_to_btc(valor: number){
  //   // retorna la cantidad de btc en 'valor' ves
  //   let usd: number = valor * this.precio_usd;
  //   return (usd / this.precio_btc)
  // }

  // ves_to_usd(valor: number){
  //   // retorna la cantidad de usd en 'valor' ves
  //   return (valor * this.precio_usd);
  // }

}
