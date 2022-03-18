import { createElement } from 'lwc';
import MyWireComponent from 'c/myWireComponent';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

const mockGetContactList = require('./data/getContactList.json');
const mockGetContactListNoRecord = require('./data/getContactListNoRecord.json');

const getContactListAdapter = registerApexTestWireAdapter(getContactList);

describe('c-my-wire-component', () => {
    beforeEach(() => {
        const element = createElement('c-my-wire-component', {
            is: MyWireComponent
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('Renders items', () => {
        const element = document.querySelector('c-my-wire-component');
        getContactListAdapter.emit(mockGetContactList);
        return Promise.resolve().then(() => {
            const pElements = element.shadowRoot.querySelectorAll('p');
            expect(pElements.length).toBe(mockGetContactList.length);
        });
    });
    it('Renders no items', () => {
        const element = document.querySelector('c-my-wire-component');
        getContactListAdapter.emit(mockGetContactListNoRecord);
        return Promise.resolve().then(() => {
            const pElements = element.shadowRoot.querySelectorAll('p');
            expect(pElements.length).toBe(mockGetContactListNoRecord.length);
        });
    });
    it('Renders error', () => {
        const element = document.querySelector('c-my-wire-component');
        getContactListAdapter.error();
        return Promise.resolve().then(() => {
            const errorElement = element.shadowRoot.querySelector('.error');
            // console.log(errorElement.textContent);
            expect(errorElement.textContent).not.toBeNull();
        });
    });
});