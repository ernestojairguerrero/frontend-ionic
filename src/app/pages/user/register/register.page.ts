import { Component, OnInit, inject } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private _navCtrl = inject(NavController);

  ngOnInit() {
  }

  register(){
    this._navCtrl.navigateForward('/login');
  }

}
