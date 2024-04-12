import { Component } from '@angular/core';
import { User } from '../../services/auth/user';
import { environment } from '../../../environments/environments';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {
  errorMessage:String = "";
  user?:User;

  constructor(private userService:UserService){
    this.userService.getUser(environment.userId).subscribe({
      next:(userData)=>{
        this.user = userData;
      },
      error:(errorData)=>{
        this.errorMessage = errorData;
      },
      complete:()=>{
        console.info("User Data ok");
      }
  });
  }
}
