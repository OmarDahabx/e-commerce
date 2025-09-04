import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router =inject(Router);
  private readonly formBuilder =inject(FormBuilder);

  flag:boolean = true;
  reFlag:boolean = true;
  msgError:string = "";
  isLoading:boolean = false ;
  registerForm !: FormGroup ;
  subscription:Subscription = new Subscription();
  

  // registerForm: FormGroup = new FormGroup({
  //   name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20), ]),
  //   email: new FormControl( null , [Validators.required , Validators.email , ]),
  //   password: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  //   rePassword: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  //   phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // } , {validators : [this.confirmPassword ,]})

 ngOnInit(): void {
   this.initRegisterForm()
 }
  initRegisterForm():void {
    this.registerForm =   this.formBuilder.group({
  name: [ null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)] ],
  email: [ null , [Validators.required , Validators.email] ],
  password: [ null , [Validators.required , Validators.pattern(/^\w{6,}$/)] ],
  rePassword: [ null , [Validators.required , Validators.pattern(/^\w{6,}$/)] ],
  phone: [ null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)] ],
}, { validators: this.confirmPassword });
  }





  confirmPassword(group:AbstractControl){
    // return group.get('password')?.value === group.get('rePassword')?.value ? null : {missmatch : true}

    if( group.get('password')?.value === group.get('rePassword')?.value ){
      return null
    } else{
      group.get('rePassword')?.setErrors( { missmatch : true } );
      return  {missmatch : true}
    }
  }

  submitForm():void {

    if( this.registerForm.valid ){
      this.subscription.unsubscribe()
          this.isLoading = true;
          this.msgError = '';
          this.subscription = this.authService.signup(this.registerForm.value).subscribe({
            next:(res)=>{
              console.log(res)
              this.isLoading = false;
              if(res.message === 'success'){
                this.msgError = '';
                setTimeout(()=>{
                  this.router.navigate(['/login'])
                } , 2000)
              
            }
            },
            error:(err)=>{
              console.log(err)
              this.isLoading = false;
              this.msgError = err.error.message;
            }
          })
    }else {
      this.registerForm.get('rePassword')?.patchValue('');
      this.registerForm.markAllAsTouched();
    }
  }

}
