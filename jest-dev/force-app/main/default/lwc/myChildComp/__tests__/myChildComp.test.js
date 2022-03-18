import { createElement } from 'lwc';
import MyChildComp from 'c/myChildComp';
const USER_DATA = {
    Id: '1',
    Name: 'John'
};
const MESSAGE = 'No user data availabe';

describe('c-my-child-comp suite', () => {
    beforeEach(() => {
        
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders name based on public property', () => {
        const element = createElement('c-my-child-comp', {
            is: MyChildComp
        });
        element.userDetail = USER_DATA;
        document.body.appendChild(element);
        const divEl = element.shadowRoot.querySelector('.userName');
        expect(divEl.textContent).toBe(USER_DATA.Name);
    });
    
    it('render message if userDetails is not available', () => {
        const element = createElement('c-my-child-comp', {
            is: MyChildComp
        });
        document.body.appendChild(element);
        const pEl = element.shadowRoot.querySelector('p');
        expect(pEl.textContent).toBe(MESSAGE);
    });
});