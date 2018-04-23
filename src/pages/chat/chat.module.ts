import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ChatPage } from "./mainChat/chat";
import { SingleChatComponent } from "./singleChat/single-chat";
import { SocketIoModule, SocketIoConfig } from "ng-socket-io";
import { AppSettings } from "../../common/constant";
import { ChatService } from './chat-service';
const config: SocketIoConfig = { url: AppSettings.url, options: {} };

@NgModule({
  declarations: [SingleChatComponent, ChatPage],
  exports: [ChatPage, SingleChatComponent],
  entryComponents: [SingleChatComponent],
  imports: [IonicPageModule.forChild(ChatPage), SocketIoModule.forRoot(config)],
  providers: [],

})
export class ChatPageModule { }
