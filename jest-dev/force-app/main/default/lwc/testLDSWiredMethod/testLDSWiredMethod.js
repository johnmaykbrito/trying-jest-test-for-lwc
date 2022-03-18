import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// import CASE_NUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';

const FIELDS = ['Case.CaseNumber'];

export default class TestLDSWiredMethod extends LightningElement {
    @api recordId;
    case;
    show = false;
    
    @wire(getRecord, {recordId: '$recordId', fields: FIELDS})
    caseWired({ error, data }) {
        if (error) {
            let message = 'Unknown error';
            if (Array.isArray(error.body)) {
                message = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading contact',
                    message,
                    variant: 'error',
                }),
            );
        } else if (data) {
            this.case = data;
            this.show = true;
            console.log(this.case);
        }
    }

    get caseNumber() {
        return getFieldValue(this.case, 'Case.CaseNumber')
    }

}