import { Component, Input, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Socket } from "ng-socket-io";
import { AppSettings } from "../../../common/constant";
import { ChatPage } from '../mainChat/chat';
import { ChatService } from '../chat-service';

/**
 * Generated class for the SingleChatComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "single-chat",
  templateUrl: "single-chat.html",
})
export class SingleChatComponent {
  textMsg: string = "";
  pairId = "";
  messages = []; // {"userID":"wferwvrewv", "pairID":"sadvdvv", "chat":"sdfevfv"}
  user: any = {};

  @Input("selectedUser")
  set selectedUser(data) {
    console.log("selected user : ", data);
    if (data) {
      this.pairId = data.userID;
      this.user = data;
    }
  }



  constructor(private http: HttpClient, private socket: Socket) {
    this.socket.on("newMsg", data => {
      console.log("receieve msg data : ", data);
      this.chatPage.toggle(data.userID);
      this.addMessage(data);
      document.getElementsByTagName('title')[0].innerHTML = 'IChat*';
    });
    this.socket.on("download", this.receiveFile);
  }
  chatPage = new ChatPage(null, null, this.socket, this.http);


  keyPress(ee) {
    if (ee.keyCode === 13 && !ee.shiftKey) {
      console.log("Enter button pressed...", ee);
      console.log(this.textMsg);
      this.sendMessage();
    }
  }

  sendMessage() {
    this.http
      .post(AppSettings.url + "chats", {
        userID: this.socket.ioSocket.id,
        dName: AppSettings.userName,
        email: AppSettings.userEmail,
        pairID: this.pairId,
        chat: this.textMsg
      })
      .subscribe(
      data => {
        console.log("message sent : ", data);
        this.addMessage(data);
        this.textMsg = "";

      },
      error => {
        console.log("message sent error : ", error);
      }
      );
  }

  sendFile(e) {
    console.log("File name: ", e);
    var file = e.target.files[0];
    console.log("File name: " + file.name);
    var fileupoload = {
      userID: this.socket.ioSocket.id,
      pairID: this.pairId,
      dName: AppSettings.userName,
      file: file,
      filename: file.name
    };
    this.socket.emit("fileUpload", fileupoload);
  }

  receiveFile(data) {
    // var sampleBytes = new Int8Array(4096);
    console.log("download", data);
    var saveByteArray = (function () {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      return function (data, name) {
        var blob = new Blob(data, {
          type: "octet/stream"
        }),
          url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
      };
    })();
    saveByteArray([data.file], data.filename);
  }

  addMessage(data) {
    this.messages.push(data);
  }
}
