import { Component } from '@angular/core';
import { User } from '../../services/auth/user';
import { environment } from '../../../environments/environments';
import { UserService } from '../../services/user/user.service';
import { last } from 'rxjs';
import { Validators,FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {
  errorMessage:String = "";
  user?:User;
  userLoginOn:boolean = false;
  editMode:boolean = false;

  registerForm=this.formBuilder.group({
    id:[""],
    firstname:["",Validators.required],
    lastname:["",Validators.required],
    password:["",Validators.required]
  });

  constructor(private userService:UserService, private formBuilder: FormBuilder, private loginService:LoginService,
    private router:Router
  ) { 
    this.userService.getUser(environment.userId).subscribe({
      next:(userData)=>{
        this.user = userData;
        this.registerForm.controls.id.setValue(userData.id.toString());
        this.registerForm.controls.firstname.setValue(userData.firstname);
        this.registerForm.controls.lastname.setValue(userData.lastname);
      },
      error:(errorData)=>{
        this.errorMessage = errorData;
      },
      complete:()=>{
        console.info("User Data ok");
      }
  });
  this.loginService.userLoginOn.subscribe({
    next:(userLoginOn)=>{
      this.userLoginOn = userLoginOn;
    }
  })
}

get firstname(){
  return this.registerForm.controls.firstname;
}

get lastname(){
  return this.registerForm.controls.lastname;
}

savePersonalDetailsData(){
  if(this.registerForm.valid){
    this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
      next:()=>{
        this.editMode = false;
        this.router.navigate(['/inicio']);
      },
      error:(errorData)=>
        console.error(errorData)
      ,
      complete:()=>{
        console.info("User updated");
      }
    });
  } 
}

}