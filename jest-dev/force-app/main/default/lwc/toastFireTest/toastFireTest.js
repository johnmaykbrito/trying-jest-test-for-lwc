import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class ToastFireTest extends LightningElement {
    showToast() {
        const event = new ShowToastEvent({
            title: 'Toast Title',
            message: 'Here is our toast message',
        });
        this.dispatchEvent(event);
    }
}