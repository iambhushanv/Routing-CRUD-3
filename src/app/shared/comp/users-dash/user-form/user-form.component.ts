import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/models/user';
import { FormUtilityService } from 'src/app/shared/services/form-utility.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  isInEditMode: boolean = false
  userForm !: FormGroup
  editUser = {} as Iuser
  userId !: string

  constructor(
    private _userService: UserService,
    private _snackBar: SnackBarService,
    private _router: Router,
    private _routes: ActivatedRoute,
    private _formUtilityService: FormUtilityService
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.addSkillControl()
    this.isAddSameHandler()
    this.currentAddressHandler()
    this.patchData()
  }

    
  patchData() {
    this._routes.params.subscribe(param => {
      this.userId = param['id']
       if (this.userId) {
      this.isInEditMode = true
      this._userService.fetchUserById(this.userId)
        .subscribe({
          next: res => {
            this.editUser = res
            this.userForm.patchValue(this.editUser)
            this._formUtilityService.patchFormArr(res.skills, this.skillsArr)

            if(this.editUser.userRole === 'Candidate'){
              this.userForm.disable()
            }

            if (this.formControls['address'].get('current')?.valid) {
              this.formControls['isAddSame'].enable()
              this.formControls['address'].get('permanent')?.patchValue(this.editUser.address.permanent)
            }
          },
          error: err => {
            console.log(err);
          }
        })
    }
    })
  }

  currentAddressHandler() {
    this.formControls['isAddSame'].valueChanges
      .subscribe(val => {
        if (val) {
          let currentAddVal = this.formControls['address'].get('current')?.value
          this.formControls['address'].get('permanent')?.patchValue(currentAddVal)
          this.formControls['address'].get('permanent')?.disable()
        }
        else if (this.isInEditMode && !val) {
          this.formControls['address'].get('permanent')?.patchValue(this.editUser.address.permanent)
          this.formControls['address'].get('permanent')?.enable()
        }

        else {
          this.formControls['address'].get('permanent')?.reset()
          this.formControls['address'].get('permanent')?.enable()
        }
      })
  }

  isAddSameHandler() {
    this.formControls['address'].get('current')?.valueChanges
      .subscribe(val => {
        if (this.formControls['address'].get('current')?.valid) {
          this.formControls['isAddSame'].enable()
        }
        else {
          this.formControls['isAddSame'].reset()
          this.formControls['isAddSame'].disable()
        }
      })
  }

  createUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl(null, [Validators.required]),
      profileDescription: new FormControl(null, [Validators.required]),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }, [Validators.required]),
      address: new FormGroup({
        current: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        }),
        permanent: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        })
      }),
      skills: new FormArray([])
    })
  }

  addSkillControl() {
    if (this.formControls['skills'].valid) {
      let skillcontrol = new FormControl(null, [Validators.required])
      this.skillsArr.push(skillcontrol)
    }
  }

  get formControls() {
    return this.userForm.controls
  }

  get skillsArr() {
    return this.formControls['skills'] as FormArray
  }

  onAddUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      let userDetails: Iuser = { ...this.userForm.getRawValue(), userId: Date.now().toString() }
      this._userService.addUser(userDetails)
        .subscribe({
          next: res => {
            this._snackBar.openSnackBar(res.msg)
            this._router.navigate(['/user'])
          },
          error: err => {
            this._snackBar.openSnackBar(err.msg)
          }
        })
    }
  }

  onUpdate() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      let updateObj: Iuser = { ...this.userForm.getRawValue(), userId: this.editUser.userId }
      this._userService.onUpdate(updateObj)
        .subscribe({
          next: res => {
            this._snackBar.openSnackBar(res.msg)
            this._router.navigate(['/user', updateObj.userId],
              {queryParams : { ur : updateObj.userRole}}
            )
          },
          error: err => {
            this._snackBar.openSnackBar(err.msg)
          }
        })
    }
  }

  onSkillRemove(i: number){
    this.skillsArr.removeAt(i)
  }
}
