import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class ChatService {

    isOpen = false;
    constructor() {

    }

    /*    @Output() change: EventEmitter<boolean> = new EventEmitter();
    */
    toggle() {
        console.log("Toggle Function");
        /*this.isOpen = !this.isOpen;
        this.change.emit(this.isOpen);*/
    }

}