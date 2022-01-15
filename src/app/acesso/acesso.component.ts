import { Component, OnInit} from '@angular/core';
import { trigger, state, style, animate, transition,keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations:[
    trigger('animacao-banner', [
      state('criado', style({
        opacity:1
      })),
      transition('void =>criado', [
        style({opacity:0, transform: 'translate(-30px,-50px'}),
        animate('500ms 0s ease-in-out') //suracao,dalay e acelaração
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity:1
      })),
      transition('void =>criado', [
        style({opacity:0, transform: 'translate(+30px,-50px'}),
        animate('1.5s 0s ease-in-out',keyframes([
          style({offset:0.15, opacity:1, transform:'translateX(0)'}),
          style({offset:0.30, opacity:1, transform:'translateX(10)'}),
          
          style({offset:0.50, opacity:1, transform:'translateY(-30px)'}),
          style({offset:0.60, opacity:1, transform:'translateY(40px)'}),

          style({offset:0.80, opacity:1, transform:'translateX(-50px)'}),
          style({offset:0.90, opacity:1, transform:'translateX(50px)'})
        ])) //suracao,dalay e acelaração
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {
  
  public estadoPainel:string = 'criado';
  public estadoBanner:string = 'criado';
  public cadastro:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainel(event:string):void{
    //console.log("Parametro recebido no componente pai é =>",event);
    this.cadastro = event ==='cadastro' ? true : false;
  }

  public inicioDaAnimacao():void{
    
  }

}
