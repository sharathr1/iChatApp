import { Component, Injectable, NgZone } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SingleChatComponent } from "../singleChat/single-chat";
import { Socket } from "ng-socket-io";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { AppSettings } from "../../../common/constant";
declare var jquery: any;
declare var $: any;
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-chat",
  templateUrl: "chat.html"
})
export class ChatPage {
  singleChatPage: any = SingleChatComponent;
  shouldShowCancel = true;
  socketId: Object = {};
  userList = [];
  msgUserID: string;
  public showNotification = false;
  showicon: boolean = false;
  toggle(userID) {
    this.showicon = true;
    console.log(this.showNotification + " Msg Notification : ", userID);
    this.showNotification = !this.showNotification;
    $("#" + userID).show();
    console.log(this.showNotification + " Msg Notification : ", userID);
    console.log(this.showicon, "  showicon : ");

    if (this.showNotification) {
      $("#show").show();
    } else {
      $("#show").hide();
    }
    /*this.ngZone.runOutsideAngular(() => {
      this.ngZone.run(() => { console.log('Outside Done!'); });
    });*/
  }

  testMethod($event) {
    console.log("testMethod " + this.showNotification);
    this.showNotification = !this.showNotification;
  }

  selectedUser: any;

  selectUser(user) {
    this.selectedUser = user;
    $("#" + user.userID).hide();
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public socket: Socket,
    private http: HttpClient,
  ) {
    this.userList = []; // { userID: "sdvdf", pairID: "svefvfsvef", dName: "Vyom" }
    // this.socket.connect();
    this.socketId = this.socket.ioSocket;
    console.log("this.socketId : ", this.socket.ioSocket.id);
    this.registerUser(AppSettings.userName, AppSettings.userEmail, this.socket);
    this.getUserList();
    this.getUsers().subscribe(users => {
      console.log("users ioSocket.id ... ", this.socket.ioSocket.id);
      this.filterUserList(users);
    });
  }

  filterUserList(users) {
    console.log("before filter userList : ", users);
    this.userList = users.filter(item => item.email != AppSettings.userEmail);
    console.log(" afetr filter userList : ", this.userList);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChatPage");
  }

  registerUser(userName, userEmail, socket) {
    console.log("socketId : ", socket.ioSocket.id);
    console.log("socketId : ", JSON.stringify(socket.ioSocket.id));
    this.http
      .post(AppSettings.url + "register", {
        dName: userName,
        email: userEmail,
        userID: this.socket.ioSocket.id
      })
      .subscribe(
      data => {
        console.log("registerUser : ", data);
      },
      error => {
        console.log("registerUser error : ", error);
      } // error path
      );
  }

  getUserList() {
    this.http.get(AppSettings.url + "getUserList").subscribe(
      data => {
        console.log("userList : ", data);
        this.filterUserList(data);
      },
      error => {
        console.log("getUserList error : ", error);
      } // error path
    );
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on("userList", data => {
        console.log("observable data : ", data, observer);
        observer.next(data);
      });
    });
    return observable;
  }

  onInput() {
    console.log("onInput..");
  }

  onCancel() {
    console.log("onInput..");
  }
}
