import { Component, Input, OnInit, inject } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {


  private _navCtrl = inject(NavController);

  ngOnInit() {}

  openConfiguracion(){
    this._navCtrl.navigateForward('/profile');
  }

}
