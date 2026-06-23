import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iproduct } from '../../models/prod';
import { ProductsService } from '../../services/products.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  isInEditMode: boolean = false
  productForm !: FormGroup
  productId !: string
    productObj !: Iproduct
  disableUpdateBtn: boolean = false


  constructor(
    private _productService : ProductsService,
    private _snackBar: SnackBarService,
    private _router : Router,
    private _routes: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.createProductForm()
     this.patchProductData()
    this.CanReturnHandler()
  }

    CanReturnHandler() {
       this._routes.queryParams
      .subscribe(res => {
        if (res['cr'] == 0) {
          this.productForm.disable()
          this.disableUpdateBtn = true
        } else {
          this.productForm.enable()
          this.disableUpdateBtn = false
        }

      })
  }

  patchProductData() {
    this.productId = this._routes.snapshot.paramMap.get('id')!
    if (this.productId) {
      this.isInEditMode = true
    }
    this._productService.fetchProductById(this.productId)
      .subscribe({
        next: res => {
          this.productForm.patchValue(res)
        }
      })
  }

    createProductForm() {
    this.productForm = new FormGroup({
      pname: new FormControl(null, [Validators.required]),
      pstatus: new FormControl('In-Progress'),
      canReturn: new FormControl(1,),
    })
  }

  onProductAdd() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
    } else {
      let productObj: Iproduct = { ...this.productForm.value, pid: Date.now().toString() }
      this._productService.createProduct(productObj)
        .subscribe({
          next: res => {
            this._snackBar.openSnackBar(res.msg)
            this.productForm.reset()
            this._router.navigate(['products'])
          },
          error: err => {
            this._snackBar.openSnackBar(err.msg)
          }
        })
    }
  }

   onUpdate() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
    } else {
      let updatedObj: Iproduct = { ...this.productForm.value, pid: this.productId }
      this._productService.onUpdate(updatedObj)
        .subscribe({
          next: res => {
            this._snackBar.openSnackBar(res.msg)
            this.isInEditMode = false
            this.productForm.reset()
            this._router.navigate(['products'])
          },
          error: err => {
            this._snackBar.openSnackBar(err.msg)
          }
        })
    }
  }

}
