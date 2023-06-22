import { Component, OnInit, inject } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {

  private _navCtrl = inject(NavController);

  ngOnInit() {}

  irPost(){
    this._navCtrl.navigateBack('/add-post');
  }

  
  irhome(){
    this._navCtrl.navigateBack('/home');
  }
}
