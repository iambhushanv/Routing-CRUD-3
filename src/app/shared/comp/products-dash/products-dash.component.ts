import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../models/prod';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-dash',
  templateUrl: './products-dash.component.html',
  styleUrls: ['./products-dash.component.scss']
})
export class ProductsDashComponent implements OnInit {
  getProductsArr !: Array<Iproduct>

  constructor(
    private productsService : ProductsService,
    private _router : Router
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
        if(this.getProductsArr.length > 0){
          this._router.navigate(['products', this.getProductsArr[0].pid],
            {queryParams : {cr : this.getProductsArr[0].canReturn}}
          )      
        
        }
      },
      error : err => {
        console.log(err);     
      }
    })
  }

}
