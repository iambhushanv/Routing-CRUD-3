import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/models/user';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from 'src/app/shared/services/user.service';
import { GetConfirmComponent } from '../../product-detail/get-confirm/get-confirm.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId !: string
  userDetails !: Iuser

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _matDialog: MatDialog,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.fetchUserDetails()
  }

  fetchUserDetails() {
    this._route.params.subscribe(param => {
      this.userId = param['id']
      console.log(this.userId);
      

      if (this.userId) {
        this._userService.fetchUserById(this.userId)
          .subscribe({
            next: res => {
              this.userDetails = res
            },
            error: err => {
              console.log(err);
            }
          })
      }
    })

  }

  onRemove() {
    let config = new MatDialogConfig()
    config.width = '350px'
    config.disableClose = true
    config.data = `Are you sure, you want to remove the user with id ${this.userId}`
    let matR = this._matDialog.open(GetConfirmComponent, config)
    matR.afterClosed().subscribe(res => {
      if (res) {
        this._userService.onRemove(this.userId)
          .subscribe({
            next: res => {
              this._snackBar.openSnackBar(res.msg)
              this._router.navigate(['user'])
            },
            error: err => {
              this._snackBar.openSnackBar(err.msg)
            }
          })
      }
    })
  }


}
