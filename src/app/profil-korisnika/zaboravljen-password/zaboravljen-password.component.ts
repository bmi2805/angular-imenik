import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-zaboravljen-password',
  templateUrl: './zaboravljen-password.component.html',
  styleUrls: ['./zaboravljen-password.component.scss']
})
export class ZaboravljenPasswordComponent {
  email : string = '';

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  // forgotPassword() {
    
  // }

}
