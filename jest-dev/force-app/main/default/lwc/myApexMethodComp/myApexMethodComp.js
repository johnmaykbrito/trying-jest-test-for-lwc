import { LightningElement } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList'

export default class MyApexMethodComp extends LightningElement {
    accounts;
    error;

    loadAccounts() {
        getAccountList().then(result => {
            this.accounts = result;
            this.error = null;
        }).catch(error => {
            this.error = error;
            this.accounts = null;
        });
    }

    renderedCallback() {
        if (this.accounts) {
            console.log(this.accounts);
        }
        if (this.error) {
            console.log(this.error);
        }
    }

}