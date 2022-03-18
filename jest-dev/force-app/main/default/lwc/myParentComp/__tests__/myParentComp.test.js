import { createElement } from 'lwc';
import MyParentComp from 'c/myParentComp';
const USER_RESULT = 'John';

describe('c-my-parent-comp suite', () => {
    beforeEach(() => {
        const element = createElement('c-my-parent-comp', {
            is: MyParentComp
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('render child component', () => {
        const element = document.querySelector('c-my-parent-comp');
        const childElement = element.shadowRoot.querySelectorAll('c-my-child-comp');
        expect(childElement.length).toBe(1);
    });
    
    it('set user data property correctly', () => {
        const element = document.querySelector('c-my-parent-comp');
        const childElement = element.shadowRoot.querySelector('c-my-child-comp');
        expect(childElement.userDetail.Name).toBe(USER_RESULT);
    });
});