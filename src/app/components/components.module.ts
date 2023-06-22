import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs/tabs.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';



@NgModule({
  declarations: [
    TabsComponent,
    HeaderComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TabsComponent,
    HeaderComponent,
    PostsComponent
  ]
})
export class ComponentsModule { }
