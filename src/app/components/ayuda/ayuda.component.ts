import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.irArriba();
  }

  irArriba(){
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
}
