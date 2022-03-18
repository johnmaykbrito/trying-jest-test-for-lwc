import { createElement } from 'lwc';
import TestLDSWiredMethod from 'c/testLDSWiredMethod';
import { getRecord } from 'lightning/uiRecordApi';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

// Mock realistic data
const mockGetRecord = require('./data/getRecord.json');

// Register as an LDS wire adapter
const getRecordAdapter = registerLdsTestWireAdapter(getRecord);

describe('getRecord @wire data', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders contact details', () => {
        const element = createElement('c-test-l-d-s-wired-method', {
            is: TestLDSWiredMethod
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getRecordAdapter.emit(mockGetRecord);

        return Promise.resolve().then(() => {
            // Select elements for validation
            const nameElement = element.shadowRoot.querySelector('p.case-number');
            expect(nameElement.textContent).toBe(
                'Case Number: ' + mockGetRecord.fields.CaseNumber.value
            );
        });
    });
});