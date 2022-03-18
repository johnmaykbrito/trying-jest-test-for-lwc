import { createElement } from 'lwc';
import MyApexMethodComp from 'c/myApexMethodComp';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

const APEX_ACCOUNT_LIST_ERROR = require('./data/accountError.json');
const APEX_ACCOUNT_LIST_SUCCESS = require('./data/accountList.json');

// jest.mock(moduleName, factory, options);
jest.mock('@salesforce/apex/AccountController.getAccountList',
() => ({
    default: jest.fn()
}),
{virtual: true}
);

describe('c-my-apex-method-comp suite', () => {
    beforeEach(() => {
        const element = createElement('c-my-apex-method-comp', {
            is: MyApexMethodComp
        });
        document.body.appendChild(element);
    });
    
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('rendres accounts returned from imperative call', () => {
        getAccountList.mockResolvedValue(APEX_ACCOUNT_LIST_SUCCESS); // RESOLVED
        const element = document.querySelector('c-my-apex-method-comp');
        const btn = element.shadowRoot.querySelector('lightning-button');
        btn.click();
        return new Promise(setImmediate).then(() => {
            const details = element.shadowRoot.querySelectorAll('.accountName');
            expect(details.length).toBeGreaterThan(0);
            expect(details[0].textContent).toBe(APEX_ACCOUNT_LIST_SUCCESS[0].Name);
        });
    });
    it('rendres the error when apex return an error', () => {
        getAccountList.mockRejectedValue(APEX_ACCOUNT_LIST_ERROR); // REJECTED
        const element = document.querySelector('c-my-apex-method-comp');
        const btn = element.shadowRoot.querySelector('lightning-button');
        btn.click();
        return new Promise(setImmediate).then(() => {
            const errorEl = element.shadowRoot.querySelector('.error');
            expect(errorEl).not.toBeNull();
        });
    });
});