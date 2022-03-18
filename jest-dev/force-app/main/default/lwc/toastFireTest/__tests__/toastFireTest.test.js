//https://www.foglightsolutions.com/blog/lwc_jest_unit_testing/
import { createElement } from 'lwc';
import ToastFireTest from 'c/toastFireTest';

// import { ShowToastEventName } from 'lightning/platformShowToastEvent';
const SHOW_TOAST_EVT = 'lightning__showtoast';

describe('c-toast-fire-test', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    test('the ShowToastEvent is fired when the user clicks the button', () => {
        const ToastExampleElement = createElement('c-toast-fire-test', {
            is: ToastFireTest
        });
        document.body.appendChild(ToastExampleElement);

        const showToastHandler = jest.fn();
        // ToastExampleElement.addEventListener(ShowToastEventName, showToastHandler);
        ToastExampleElement.addEventListener(SHOW_TOAST_EVT, showToastHandler);
        
        
        return Promise.resolve().then(() => {
            const showToastBtn = ToastExampleElement.shadowRoot.querySelector('lightning-button');
            showToastBtn.click();

        }).then(()=> {
            expect(showToastHandler).toBeCalledTimes(1);
        });
    });
});