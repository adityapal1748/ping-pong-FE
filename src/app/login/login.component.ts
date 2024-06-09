import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  refree = true;
  enableLogin = false;
  adminKey: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private socketService: SocketService,
    private service: AppService,
    private _snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.playerJoined()

    this.adminJoined()
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginUser()
      
    }


  }
  loginUser() {
    const { username, password } = this.loginForm.value;
    let payload = { "name": username, password, adminKey: localStorage.getItem('adminKey') }
    this.service.login(payload).subscribe((res: any) => {
      console.log(res)
      if (res?.success) {
        localStorage.setItem('token',res?.data.token)
        localStorage.setItem('id',res?.data.id)
        localStorage.setItem('role',res?.data.role)
        this._snackBar.open("User Logged in Successfully", "", {
          duration: 3000
        })
        this.router.navigate(['/lobby'])

      } else {
        this._snackBar.open(res?.message, "", {
          duration: 3000
        })
      }
    },(err) =>{
      this._snackBar.open(err?.error?.message, "", {
        duration: 3000
      })
    })
  }
  adminJoined() {
    this.socketService.onAdminJoined().subscribe((msg) => {
      localStorage.setItem('adminKey',msg.adminKey)
    })
  }
  

}
