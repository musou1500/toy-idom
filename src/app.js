import {elementOpen, elementClose, text, patch} from './idom.js';

class App {
  constructor() {
    this.data = {
      amount: 0,
    };

    this.onInput = this.onInput.bind(this);
    this.render = this.render.bind(this);
  }

  onInput(e) {
    const amount = parseInt(e.target.value);
    if (isNaN(amount)) {
      return;
    }

    this.data.amount = amount;
    patch(document.body, this.render);
  }

  render() {
    elementOpen('div');
    {
      elementOpen('input', [
        ['type', 'number'],
        ['placeholder', 'input number...'],
        ['oninput', this.onInput],
      ]);
      elementClose('input');
    }
    elementClose('div');
    elementOpen('p');
    {
      text(`given number is ${this.data.amount}`);
    }
    elementClose('p');
    elementOpen('ul');
    {
      for (let i = 0; i < this.data.amount; i++) {
        elementOpen('li');
        {
          elementOpen('span');
          {
            text(i.toString());
          }
          elementClose('span');
        }
        elementClose('li');
      }
    }
    elementClose('ul');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  patch(document.body, app.render);
});
