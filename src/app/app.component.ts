import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { RegisterPage } from "../pages/register/register";
import { ChatPage } from "../pages/chat/mainChat/chat";
import { enableProdMode } from "@angular/core";
import { AppSettings } from "../common/constant";

enableProdMode();
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  // rootPage: any = AppSettings.userEmail && AppSettings.userName
  //   ? ChatPage
  //   : RegisterPage;

  rootPage: any = RegisterPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log("AppSettings.userEmail : ", AppSettings.userEmail);
      console.log("AppSettings.userName : ", AppSettings.userName);
    });
  }
}
