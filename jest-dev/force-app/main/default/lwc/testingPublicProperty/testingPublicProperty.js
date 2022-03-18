import { LightningElement, api } from 'lwc';

export default class TestingPublicProperty extends LightningElement {
    @api greeting = 'World';
    show = true;
}