import {elementOpen, elementClose, text, patch} from './idom.js';

function render(data) {
  elementOpen('ul');
  {
    for (let task of data.tasks) {
      elementOpen('li');
      {
        elementOpen('span');
        {
          text(task);
        }
        elementClose('span');
      }
      elementClose('li');
    }
  }
  elementClose('ul');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('button').addEventListener('click', () => {
    data.tasks.push(data.name);
    patch(document.body, render, data);
  });

  document.querySelector('input').addEventListener('input', e => {
    data.name = e.target.value;
    patch(document.body, render, data);
  });

  const data = {
    name: '',
    tasks: []
  };

  patch(document.body, render, data);
});
