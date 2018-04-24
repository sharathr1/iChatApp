import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { RouterModule, Routes } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { FileDropModule } from "ngx-file-drop";
import { ServiceWorkerModule } from "@angular/service-worker";

import { MyApp } from "./app.component";

import { ChatPageModule } from "../pages/chat/chat.module";
import { RegisterPageModule } from "../pages/register/register.module";
import { AppRoutingModulePageModule } from "../pages/app-routing-module/app-routing-module.module";
import { PageNotFoundPageModule } from "../pages/page-not-found/page-not-found.module";
import { AppSettings } from '../common/constant';
import { ChatPage } from '../pages/chat/mainChat/chat';
import { FileUploadModule } from "angular-file-uploader";
import { IDBStatic } from '../common/idb';
import { Ng2FileDropModule } from 'ng2-file-drop';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule, FileUploadModule, Ng2FileDropModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AppRoutingModulePageModule,
    ChatPageModule,
    RegisterPageModule,
    PageNotFoundPageModule,
    FileDropModule,
    ServiceWorkerModule.register("./service-worker.js", { enabled: true })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar, ChatPage,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AppSettings
  ]
})
export class AppModule { }
