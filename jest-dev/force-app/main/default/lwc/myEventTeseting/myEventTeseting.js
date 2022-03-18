import { LightningElement, track } from 'lwc';

export default class MyEventTeseting extends LightningElement {
    @track greeting = 'World';

    handleChange(event) {
        this.greeting = event.target.value;
    }
}