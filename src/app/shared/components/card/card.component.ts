import { Component, Input } from '@angular/core';
import { Iproduct } from '../../../core/models/iProducts/iProduct.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input({required:true}) product :Iproduct = {} as Iproduct;



}
