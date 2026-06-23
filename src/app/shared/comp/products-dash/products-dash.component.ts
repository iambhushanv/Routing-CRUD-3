import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../models/prod';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-dash',
  templateUrl: './products-dash.component.html',
  styleUrls: ['./products-dash.component.scss']
})
export class ProductsDashComponent implements OnInit {
  getProductsArr !: Array<Iproduct>

  constructor(
    private productsService : ProductsService

  ) { }

  ngOnInit(): void {
    this.fetchProduct()
  }

   trackByFun(index: number, product : Iproduct){
    return product.pid
  }

  fetchProduct(){
    this.productsService.fetchProduct()
    .subscribe({
      next : data => {
        this.getProductsArr = data
      },
      error : err => {
        console.log(err);     
      }
    })
  }

}
