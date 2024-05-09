import AppHandler from '../appHandler';

document.body.innerHTML = `<div class="validator">
<div class="validator__body">
<div class="validator__content">
  <div class="validator__tittle">
    <h1>Credit Card Validator</h1>
  </div>
  <div class="validator__widget widget">
    <ul class="widget__list">
       <div class="widget__item_absolute">
         <li class="widget__item visa"><span class="card__tittle visually_hidden">Visa</span></li>
       </div>
       <div class="widget__item_absolute">
         <li class="widget__item mastercard"><span class="card__tittle visually_hidden">MasterCard</span>
         </li>
       </div>
       <div class="widget__item_absolute">
         <li class="widget__item amex"><span class="card__tittle visually_hidden">American Express</span></li>
       </div>
       <div class="widget__item_absolute">
         <li class="widget__item discover"><span class="card__tittle visually_hidden">Discover</span></li>
       </div>
       <div class="widget__item_absolute">
         <li class="widget__item jcb"><span class="card__tittle visually_hidden">JCB</span></li>
       </div>
       <div class="widget__item_absolute">
         <li class="widget__item diners"><span class="card__tittle visually_hidden">Dinners Club</span></li>
       </div>
       <div class="widget__item_absolute">
         <li class="widget__item mir"><span class="card__tittle visually_hidden">МИР</span></li>
       </div>
     </ul>
    <form class="widget__form">
      <div class="widget__row">
        <input class="input" type="number" placeholder="Enter the card number">
        <button class="button" type="submit">Click to Validate</button>
      </div>
      <div class="message d_none">
        <p class="text"></p>
      </div>
    </form>
  </div>
</div>
</div>
</div>`;
const widget = document.querySelector('.validator');
const handler = new AppHandler(widget);

test('addMessage add message', () => {
  handler.addMessage('Test message', 'colorValid', 'bgValid');
  expect(handler.messageText.textContent).toBe('Test message');
  expect(handler.messageText.className).toBe('text colorValid');
  expect(handler.message.className).toBe('message');
  expect(handler.input.className).toBe('input bgValid');
});

test('removeMessage deletes message', () => {
  handler.removeMessage();
  expect(handler.messageText.textContent).toBe('');
  expect(handler.messageText.className).toBe('text');
  expect(handler.message.className).toBe('message d_none');
  expect(handler.input.className).toBe('input');
});

describe('activate listeners', () => {
  const eventClick = new MouseEvent('click');
  const eventSubmit = new Event('submit');

  handler.addListeners();

  test('click starts method inputHandler', () => {
    handler.inputHandler = jest.fn();
    handler.button.dispatchEvent(eventClick);
    expect(handler.inputHandler).toBeCalled();
  });

  test('submit starts event.preventDefault and inputHandler', () => {
    eventSubmit.preventDefault = jest.fn();
    handler.inputHandler = jest.fn();
    handler.form.dispatchEvent(eventSubmit);
    expect(eventSubmit.preventDefault).toBeCalled();
    expect(handler.inputHandler).toBeCalled();
  });
});
