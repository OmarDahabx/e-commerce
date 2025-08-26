import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { Iproduct } from '../../core/models/iProducts/iProduct.interface';
import { ProductsService } from '../../core/services/Products/products.service';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-products',
  imports: [CardComponent , NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
 private readonly productsService = inject(ProductsService);
  productList:Iproduct[] = [];

  pageSize!:number;
  p!:number;
  total!:number;


  ngOnInit(): void {
    this.getProductsData()
  }

  getProductsData(pageNumber : number = 1):void{
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res)=>{
          this.productList = res.data
          this.pageSize = res.metadata.limit;
          this.p = res.metadata.currentPage;
          this.total = res.results;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

}
