import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModulePage } from './app-routing-module';

import { RegisterPage } from '../register/register';
import { ChatPage } from '../chat/mainChat/chat';
import { PageNotFoundPage } from '../page-not-found/page-not-found';

const appRoutes: Routes = [
  {
    path: 'registration',
    component: RegisterPage
  },
  {
    path: 'chat',
    component: ChatPage
  },
  {
    path: '',
    redirectTo: '/registration',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundPage
  }
];


@NgModule({
  declarations: [
    AppRoutingModulePage,
  ],
  imports: [
    IonicPageModule.forChild(AppRoutingModulePage),
    RouterModule.forRoot(appRoutes, {
      enableTracing: false, // <-- debugging purposes only
      useHash: true
      // preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModulePageModule { }
