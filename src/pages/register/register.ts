import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ChatPage } from "../chat/mainChat/chat";
import { Socket } from "ng-socket-io";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AppSettings } from "../../common/constant";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  name: String = "";
  email: String = "";
  url = "http://3.209.196.136:9090/";
  userName = localStorage.getItem("name");
  userEmail = localStorage.getItem("email");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private socket: Socket,
    private http: HttpClient
  ) {
    AppSettings.userName =
      localStorage.getItem("name") != "undefined"
        ? localStorage.getItem("name")
        : "";
    AppSettings.userEmail =
      localStorage.getItem("email") != "undefined"
        ? localStorage.getItem("email")
        : "";
    console.log("AppSettings.name : ", this.name);
    console.log("AppSettings.email : ", this.email);
    this.socket.connect();
    console.log("this.socket : ", this.socket);
    if (AppSettings.userName && AppSettings.userEmail) {
      this.navCtrl.push(ChatPage);
    }
  }

  registerUser() {
    this.navCtrl.push(ChatPage); // temp
    this.http
      .post(this.url + "register", {
        dName: AppSettings.userName,
        email: AppSettings.userEmail,
        userID: this.socket.ioSocket.id
      })
      .subscribe(
      data => {
        console.log("registerUser : ", data);
        this.navCtrl.push(ChatPage);
      },
      error => {
        console.log("registerUser error : ", error);
      } // error path
      );
  }

  setloginDetails(name, email) {
    if (name && email) {
      console.log("name : ", name, "email : ", email);
      AppSettings.userEmail = email;
      AppSettings.userName = name;
      localStorage.setItem("name", AppSettings.userName.toString());
      localStorage.setItem("email", AppSettings.userEmail.toString());
      this.registerUser();
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }
}
