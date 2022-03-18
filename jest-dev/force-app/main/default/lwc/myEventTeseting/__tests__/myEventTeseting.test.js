import { createElement } from 'lwc';
import MyEventTeseting from 'c/myEventTeseting';

describe('c-my-event-teseting suite', () => {
    beforeEach(() => {
        const element = createElement('c-my-event-teseting', {
            is: MyEventTeseting
        });
        document.body.appendChild(element);
    })

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Test default greeting value should be Hello, World!', () => {
        const element = document.querySelector('c-my-event-teseting');
        const text = element.shadowRoot.querySelector('p');
        expect(text.textContent).toBe('Hello, World!');
    });
    
    it('Test default greeting value should NOT be Hello, World!', () => { 
        const element = document.querySelector('c-my-event-teseting');       
        const text = element.shadowRoot.querySelector('p');
        expect(text.textContent).not.toBe('Hello, XXX!');
    });
    
    it('Test input change event value', () => { 
        const element = document.querySelector('c-my-event-teseting'); // take ref of element       
        const inputEl = element.shadowRoot.querySelector('lightning-input'); // find input field
        inputEl.value = 'Salesforce'; // update the value
        inputEl.dispatchEvent(new CustomEvent('change')); // dispatch change event
        const text = element.shadowRoot.querySelector('p'); // fetch the new value on the paragraph
        return Promise.resolve().then(() => {
            expect(text.textContent).toBe('Hello, Salesforce!');
        })
    });
});