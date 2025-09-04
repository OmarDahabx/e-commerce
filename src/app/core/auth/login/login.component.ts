import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

private readonly authService = inject(AuthService);
  private readonly router =inject(Router);
  private readonly fb =inject(FormBuilder);
  private readonly cookieService =inject(CookieService);

  msgError:string = "";
  isLoading:boolean = false ;
  flag:boolean = true ;
  loginForm !:FormGroup ;
  subscription:Subscription = new Subscription();

  // loginForm = new FormGroup({
  //   email: new FormControl( null , [Validators.required , Validators.email , ]),
  //   password: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  // })

  ngOnInit(): void {
    this.initLoginForm()
  }
  initLoginForm():void {
    this.loginForm = this.fb.group({
      email : [ null , [Validators.required , Validators.email ]],
      password : [ null , [Validators.required , Validators.pattern(/^\w{6,}$/)] ],
    })
  }
    

  submitForm():void {

    if( this.loginForm.valid ){
      this.subscription.unsubscribe()
          this.isLoading = true;
          // this.msgError = '';
          this.subscription = this.authService.signin(this.loginForm.value).subscribe({
            next:(res)=>{
              console.log(res)
              this.isLoading = false;
              if(res.message === 'success'){
                // this.msgError = '';
                setTimeout(()=>{
                  this.cookieService.set('token' , res.token )
                  this.router.navigate(['/home'])
                } , 1000)
              
            }
            },
            error:(err)=>{
              console.log(err)
              this.isLoading = false;
              this.msgError = err.error.message;
            }
          })
    }
  }

}
