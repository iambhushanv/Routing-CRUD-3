import { Injectable } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilityService {

  constructor() { }

  patchFormArr(dataArr: Array<any>, formArr: FormArray){
    formArr.clear()
    dataArr.forEach(val => {
      let control = new FormControl(val, [Validators.required])
      formArr.push(control)
    })
  }
}
