import { createElement } from 'lwc';
import MyConditionalRendering from 'c/myConditionalRendering';

describe('c-my-conditional-rendering suite', () => {
    beforeEach(() => {
        const element = createElement('c-my-conditional-rendering', {
            is: MyConditionalRendering
        });
        document.body.appendChild(element);
    });
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Hides password', () => {
        const element = document.querySelector('c-my-conditional-rendering');
        const passwordEl = element.shadowRoot.querySelector('div.userInfo');
        expect(passwordEl.textContent).toBe('My password is ****');
    });
    
    it('Displays password', () => {
        const element = document.querySelector('c-my-conditional-rendering');
        const inputEl = element.shadowRoot.querySelector('lightning-input');
        inputEl.checked = true;
        inputEl.dispatchEvent(new CustomEvent('change'));

        const passwordEl = element.shadowRoot.querySelector('div.userInfo');
        return Promise.resolve().then(() => {
            expect(passwordEl.textContent).toBe('My password is ASDF');
        });
    });
});