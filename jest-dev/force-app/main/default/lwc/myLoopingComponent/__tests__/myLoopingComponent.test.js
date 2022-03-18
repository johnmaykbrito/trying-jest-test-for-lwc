import { createElement } from 'lwc';
import MyLoopingComponent from 'c/myLoopingComponent';
const EXPECTED = [
    'Julia', 'John', 'Barbie'
];

describe('c-my-looping-component suite', () => {
    beforeEach(() => {
        const element = createElement('c-my-looping-component', {
            is: MyLoopingComponent
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('checks the length of the list', () => {
        const element = document.querySelector('c-my-looping-component');
        const firstUl = element.shadowRoot.querySelectorAll('.forEachList>li');
        expect(firstUl.length).toBe(3);
    });
    
    it('checks the order of the list', () => {
        const element = document.querySelector('c-my-looping-component');
        const firstUl = Array.from(element.shadowRoot.querySelectorAll('.forEachList>li'));
        const userList = firstUl.map(li => li.textContent);
        expect(userList).toEqual(EXPECTED);
    });
    
    it('checks first and last on iterator', () => {
        const element = document.querySelector('c-my-looping-component');
        const firstDiv = element.shadowRoot.querySelector('.iteratorList>li:first-child>div:first-child');
        expect(firstDiv.textContent).toBe('Start of list');
        const lastDiv = element.shadowRoot.querySelector('.iteratorList>li:last-child>div:last-child');
        expect(lastDiv.textContent).toBe('End of list');
    });
});