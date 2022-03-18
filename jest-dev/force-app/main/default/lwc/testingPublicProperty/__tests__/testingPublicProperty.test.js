import { createElement } from 'lwc';
import TestingPublicProperty from 'c/testingPublicProperty';

describe('c-testing-public-property', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('Display default greeting', () => {
        const element = createElement('c-testing-public-property', {
            is: TestingPublicProperty
        });
        document.body.appendChild(element);
        // console.log(document.body.innerHTML);

        const firstDiv = element.shadowRoot.querySelector('div.first');
        expect(firstDiv.textContent).toBe('Hello, World!');

        const secondDiv = element.shadowRoot.querySelector('div.second');
        expect(secondDiv.textContent).toBe('My, World!');

        const thirdDiv = element.shadowRoot.querySelector('div.third');
        expect(thirdDiv.textContent).toBe('World');
    });
    test('Set and display public property', () => {
        const element = createElement('c-testing-public-property', {
            is: TestingPublicProperty
        });
        document.body.appendChild(element);
        element.greeting = 'John'
        console.log(document.body.innerHTML);

        // Waits for the DOM to render
        return Promise.resolve().then(() => {
            const firstDiv = element.shadowRoot.querySelector('div.first');
            expect(firstDiv.textContent).toBe('Hello, John!');

            const secondDiv = element.shadowRoot.querySelector('div.second');
            expect(secondDiv.textContent).toBe('My, John!');

            const thirdDiv = element.shadowRoot.querySelector('div.third');
            expect(thirdDiv.textContent).toBe('John');
        });
    });
});