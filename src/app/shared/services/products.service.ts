import { Injectable } from '@angular/core';
import { Iproduct, Ires } from '../models/prod';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   productsArr: Array<Iproduct> = [
  {
    pname: 'Samsung M31',
    pid: '123',
    pstatus: 'In-Progress',
    canReturn: 1
  },
  {
    pname: 'Samsung TV',
    pid: '124',
    pstatus: 'Dispatched',
    canReturn: 1
  },
  {
    pname: 'Iphone 15',
    pid: '125',
    pstatus: 'Delivered',
    canReturn: 0
  }
];
  constructor() { }

  fetchProduct(): Observable<Array<Iproduct>>{
    return of(this.productsArr)
  }

   createProduct(obj: Iproduct): Observable<Ires<Iproduct>>{
    this.productsArr.unshift(obj)
    return of({
      msg: `The new product with id ${obj.pid} is added successfully !!!`,
      data : obj
    })
  }

    fetchProductById(id: string): Observable<Iproduct>{
    let productObj = this.productsArr.find(p => p.pid === id)!
    return of(productObj)
  }

   onUpdate(obj:Iproduct){
    let getIndex = this.productsArr.findIndex(p => p.pid === obj.pid)
    this.productsArr[getIndex] = obj
     return of({
      msg: `The product with id ${obj.pid} is updated successfully !!!`,
      data : obj
    })
  }

    onRemove(id: string){
    let getIndex = this.productsArr.findIndex(p => p.pid === id)
    let arr = this.productsArr.splice(getIndex, 1)
     return of({
      msg: `The product with id ${id} is removed successfully !!!`,
      data : arr[0]
    })
  }
}
