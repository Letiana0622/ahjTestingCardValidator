import { isValid, getCreditCardNameByNumber } from './creditcard';

export default class AppHandler {
  constructor(widget) {
    this.widget = widget;
    this.input = this.widget.querySelector('.input');
    this.message = this.widget.querySelector('.message');
    this.messageText = this.widget.querySelector('.text');
    this.widgetList = this.widget.querySelector('.widget__list');
    this.form = this.widget.querySelector('.widget__form');
    this.button = this.widget.querySelector('.button');
    this.isValid = isValid;
    this.getCreditCardNameByNumber = getCreditCardNameByNumber;
  }

  addListeners() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.inputHandler();
    });
  }

  inputHandler() {
    const { value } = this.input;
    console.log(value);
    if (this.getCreditCardNameByNumber(value)) {
      if (this.isValid(value)) {
        const name = this.getCreditCardNameByNumber(value);
        this.removeMessage();
        this.addMessage(`The card is valid, the ${name} payment system`, 'colorValid', 'bgValid');
      }
      else {
        this.addMessage('The card is not valid', 'colorInvalid', 'bgInvalid');
      }
    }
    else {
      this.addMessage('the payment system was not found', 'colorInvalid', 'bgInvalid');
    }
  }

  addMessage(text, cssClass, bgInput) {
    this.messageText.textContent = text;
    this.messageText.classList.add(cssClass);
    this.message.classList.remove('d_none');
    this.input.classList.add(bgInput);
  }

  removeMessage() {
    this.messageText.textContent = '';
    this.messageText.className = 'text';
    this.message.className = 'message d_none';
    this.input.className = 'input';
  }
}
