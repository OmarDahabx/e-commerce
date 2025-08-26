import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdcutDetailsService } from './services/prodcutDetailsService/prodcut-details.service';
import { Iproduct } from '../../core/models/iProducts/iProduct.interface';




@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly prodcutDetailsService = inject(ProdcutDetailsService);
  id: string | null = null;
  prodcutDetails:Iproduct = { } as Iproduct;


ngOnInit(): void {
  this.getParams();
  this.getProductDetailsData()
}


  getParams():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
        this.id = urlParams.get('id');
      },
    })
  }

  getProductDetailsData():void{
    this.prodcutDetailsService.getDetails(this.id).subscribe({
      next:(res)=>{
          this.prodcutDetails = res.data
      },
      error:(err)=>{
          console.log(err);
      }
    })
  }
}
